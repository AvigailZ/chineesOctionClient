import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Present } from 'src/app/models/present.model';
import { User } from 'src/app/models/user.model';
import { UserDto } from 'src/app/models/userDto.model';
import { LotteryService } from 'src/app/services/lottery.service';
import { PresentService } from 'src/app/services/presents.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {

  constructor(private PresSrv:PresentService,private LotterSrv:LotteryService,private router:Router) {}
  presentsList:Present[]=[]
  winnersList:UserDto[]=[]
  user:string=''
  info:boolean=false;
  ngOnInit(){
    this.PresSrv.getPresents().subscribe(res=>{
      if(res){
        this.presentsList=res;
      }
    })
  }
  getWinner(p:Present){
   this.LotterSrv.lotteryUser(p).subscribe(user=>{
    if(user!=null){
      this.info=true
      this.user=user.name
    }
   })
  }
  getReport(){
    this.router.navigate(['./report'])
  }
  closeDialoge(){
    this.user=''
    this.info=false
  }
}
