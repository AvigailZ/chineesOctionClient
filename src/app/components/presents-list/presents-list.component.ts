import { Component, OnInit } from '@angular/core';
import { Present } from '../../models/present.model';
import { PresentService } from '../../services/presents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DonorsService } from 'src/app/services/donors.service';


@Component({
  selector: 'app-presents-list',
  templateUrl: './presents-list.component.html',
  styleUrls: ['./presents-list.component.css'],
  providers: [ConfirmationService,MessageService,PresentService]
})

export class PresentsListComponent implements OnInit{
  
  constructor(private presentSrv:PresentService, private router: Router,private activetedRoute: ActivatedRoute,
   private confirmationService:ConfirmationService,private messageService:MessageService ,private SrvDon:DonorsService) {}

  ngOnInit(): void {
    this.presentSrv.callToGetPresent$.subscribe(p=>{
      this.presentSrv.getPresents().subscribe(pr=>{
        if(pr!=null){
          {let upProd=pr.map(pr=>{this.SrvDon.getById(pr.donorId).subscribe(d=>{pr.donorId=d.firstName+" "+d.lastName});return pr});
          this.presentsList=upProd
        }
      }})
    } ) 
  }
  presentsList:Present[]=[];
  selectedPresents : Present[]=[];
  info:boolean=false;
  num:number=0;

  addPresent=()=>{
    this.router.navigate(['./addPresent/'], {relativeTo: this.activetedRoute});
  }

  savePresent=(id:number)=>{
    this.router.navigate(['./editPresent/'+ id], {relativeTo: this.activetedRoute});
  }

  delete=(item:Present )=>{
    this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + item.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.presentSrv.deletePresnt(item.id).subscribe(res=>{
                if(res==true){
                  this.presentSrv.getPresents().subscribe(p=>this.presentsList=p)
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
                }
                else if (res==false){
                  this.presentSrv.getPresents().subscribe(p=>this.presentsList=p)
                  this.messageService.add({severity:'faild', summary: 'Failed', detail: 'You cant delete this Present', life: 3000});
                  alert("You cant delete this present,Its already takan by users")
                }
              })    
          }
        });
  }

  deleteSelectedPresents(){
    this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.presentSrv.deletePresentsSelect(this.selectedPresents).subscribe
            (res=>{
              if(res==true){
                this.presentSrv.getPresents().subscribe(p=>this.presentsList=p)
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
              }
              else if(res==false){
                alert("You cant delete this present,Its already takan by users")
                this.presentSrv.getPresents().subscribe(p=>this.presentsList=p)
                this.messageService.add({severity:'faild', summary: 'Failed', detail: 'You cant delete this Present', life: 3000});
               
              }
          })
      }})
    }
    showInfo(item:Present){
      this.presentSrv.showInfo(item).subscribe(num=>{
        if(num!=-1){
          this.info=true
          this.num=num
        }
      })
    }
    closeDialoge(){
      this.info=false
      this.num=0;
    }

    sortPrice(){
      this.presentSrv.callToGetPresent$.subscribe(p=>{
        this.presentSrv.sortPrice().subscribe(p=>{
          if(p!=null)
          this.presentsList=p
        })
      } ) 
    }

    sortPurchased(){
      this.presentSrv.callToGetPresent$.subscribe(p=>{
        this.presentSrv.sortPurchased().subscribe(p=>{
          if(p!=null)
          this.presentsList=p
        })
      } ) 
    }

    // searchPresent(text:string){
    //   this.presentSrv.filterPresent(text).subscribe(res=>{
    //     if(res!=null){
    //       this.presentsList=res
    //     }
    //     else{
    //       this.presetsNotFound=true
    //     }
    //   }

    //   )
    // }
}

