import { Component } from '@angular/core';
import { UserDto } from 'src/app/models/userDto.model';
import { ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private SrvCart : ProductCartService) { }
  usersList:UserDto[]=[];
  info:boolean=false
  sum:number=0
  ngOnInit(){
      this.SrvCart.getUsers().subscribe(users=>{
        if(users!=null)
          this.usersList=users
        console.log(users);
        
      })
  }

  getSumOfCart(){
    this.SrvCart.GetNumOfCarts().subscribe(sum=>{
      if(sum!=-1){
        this.info=true;
        this.sum=sum;
      }
    })
  }
  closeDialoge(){
    this.sum=0;
    this.info=false;
  }
}
