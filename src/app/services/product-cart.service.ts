import { HttpClient } from '@angular/common/http';
import { Injectable, numberAttribute } from '@angular/core';
import { Present } from '../models/present.model';
import { ProductCart } from '../models/productCart.model';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem.model';
import { CartItemDto } from '../models/cartItemDto.model';
import { User } from '../models/user.model';
import { UserDto } from '../models/userDto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  constructor(private http:HttpClient) { }

  getProductCart():Observable<CartItem[]>{
    var cartId=numberAttribute(localStorage.getItem("cartId"));
    let url='https://localhost:7041/api/CartItems?cartId='+cartId
    return this.http.get<CartItem[]>(url, { withCredentials: true })
  }


  addToCart(item:Present){
    let pc=new CartItemDto()
    pc.presentId=item.id;
    pc.cartId=numberAttribute(localStorage.getItem("cartId"));
    let url='https://localhost:7041/api/CartItems'
    return this.http.post(url, pc, { withCredentials: true })
  }

  deleteProductFromCart(item:CartItem){
    let url='https://localhost:7041/api/CartItems/'+item.id
    return this.http.delete(url , { withCredentials: true })
  }

  deleteAll(){
    let url='https://localhost:7041/api/CartItems'
    return this.http.delete(url,{withCredentials: true })

  }

  createCart():Observable<number>{
    let url='https://localhost:7041/api/Cart'
    return this.http.post<number>(url,null,{withCredentials: true })
  }
  updateCart():Observable<CartItemDto>{
    var cartId=numberAttribute(localStorage.getItem("cartId"));
    let url='https://localhost:7041/api/Cart?cartId='+cartId
    return this.http.put<CartItemDto>(url,cartId,{withCredentials: true })
  }
  getUsers():Observable<UserDto[]>{
    let url='https://localhost:7041/api/Cart/GetUsers'
    return this.http.get<UserDto[]>(url,{withCredentials: true })
  }

  GetNumOfCarts():Observable<number>{
    let url='https://localhost:7041/api/Cart/GetSumOfCarts'
    return this.http.get<number>(url,{withCredentials: true })
  }
}
