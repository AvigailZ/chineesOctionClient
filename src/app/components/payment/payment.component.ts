import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem.model';
import { Order } from 'src/app/models/order.model';
import { ProductCart } from 'src/app/models/productCart.model';
import { User } from 'src/app/models/user.model';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductCartService } from 'src/app/services/product-cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  @Input()
  isDialog:boolean=false;
  @Output()
  isDialogChange:EventEmitter<boolean>=new EventEmitter<boolean>();
  frmPayment:FormGroup = new FormGroup({ });
  finish:boolean=false
  orderFinish:boolean=false;
  id:number=0;
  payment:number=0
  myCart:CartItem[]=[]
  emailReg: RegExp = new RegExp('[]@[a-z].[a-z]')
  numbersReg: RegExp = new RegExp('0-9')
  phoneReg: RegExp = new RegExp('[0-9]-[0-9]')
  validityReg: RegExp = new RegExp('[22-40]/[1-12]')

  constructor(private router:Router,private prodCartSrv:ProductCartService,private ordSrv:OrdersService) {
    this.frmPayment=new FormGroup({
      cardNumber:new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern(this.numbersReg)]),
      cvc:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern(this.numbersReg)]),
      validity:new FormControl('',[Validators.required,Validators.pattern(this.validityReg)]),
      identity:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    })
  }
  
  ngOnChanges(){
    this.prodCartSrv.getProductCart().subscribe(prod=>{
      this.payment=0;
      this.myCart=prod;
      console.log(prod);
      
      prod.forEach(element => {
        this.payment+=element.present.price*element.quantity;
    });
    }); 

    this.frmPayment=new FormGroup({
      cardNumber:new FormControl('',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]),
      cvc:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]),
      validity:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      identity:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    })
     
  }


  back(){
    this.router.navigate(['./cart']);
  }
  sendOrder(){
    if(this.payment!=0){
    let user=new User()
    let order=new Order()
    order.user=user;
    order.myOrder=this.myCart;
    this.finish=true;
    this.prodCartSrv.updateCart().subscribe(cart=>{
      if(cart){
      this.isDialog=false;
      //this.id=cart.id;
      setTimeout(()=>{this.orderFinish=true; },2000) 
    }else{
      alert(`There is a problem , please try again`)
      this.finish=false;
    }
  
    })}
  }
  close(){
    this.isDialogChange.emit(false)
  }
  closeOrder(){
    this.finish=false;
    this.router.navigate(['/login'])
  }
}

