import { Cart } from "./cart.model";
import { Present } from "./present.model";

export class CartItem{
    id:number=0;
    cartId :number = 0
    presentId :number = 0
    quantity : number = 0
    present:Present =new Present
    cart:Cart =new Cart
}