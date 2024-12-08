import { HttpContextToken, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteReuseStrategy, Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ProductCartService } from 'src/app/services/product-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  frmLogin:FormGroup = new FormGroup({ });
  cartId:number=0

  constructor(private router:Router,private SrvLogin:LoginService,private prodCartSrv:ProductCartService) {
    this.frmLogin=new FormGroup({ 
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    })

  }
ngOnInit(){
  
}

  login=()=>{

    this.SrvLogin.login(this.frmLogin.controls['email'].value,this.frmLogin.controls['password'].value).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        if (error.status === 401) {
            this.router.navigate(['register']);
            return of(null);
        }
        return throwError(() => new Error('An unexpected error occurred.'));
    })
      ).subscribe(res =>
      {
        if(res!=null)
          { 
            this.router.navigate(['home'])
            this.frmLogin.controls['email'].value=='avigails@gmail.com'?this.SrvLogin.statuse='Admin':this.SrvLogin.statuse='User'
            
            //  this.prodCartSrv.createCart().subscribe(id=>{
            //   if(id!=-1){
            //     this.cartId=id;
            //     localStorage.setItem("cartId",this.cartId.toString())
            //   }
            // })
          }
      });
      }
  
register(){
  this.router.navigate(['register'])
}
}
