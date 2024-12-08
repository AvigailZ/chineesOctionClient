import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem.model';
import { Present } from 'src/app/models/present.model';
import { ProductCart } from 'src/app/models/productCart.model';
import { ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  presentsInCart:CartItem[]=[]
  isDialog:boolean=false
constructor(private prodCartSrv:ProductCartService,private router: Router) {}

ngOnInit(){
  this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod);
 }

DeleteFromoCart(item:CartItem){
  this.prodCartSrv.deleteProductFromCart(item).subscribe(res=>{
    if(res){
      this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod)
    }
});}
   
back(){
  this.router.navigate(['./presentsPurchase']);
}
paying(){
  this.isDialog=true
}
deleteAll(){
  this.prodCartSrv.deleteAll().subscribe(res=>{
    if(res){
      this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod)
    }
})
}
AddToCart(item:CartItem){
  this.prodCartSrv.addToCart(item.present).subscribe(res=>{ 
    this.prodCartSrv.getProductCart().subscribe(prod=>this.presentsInCart=prod);
  })
}
}
