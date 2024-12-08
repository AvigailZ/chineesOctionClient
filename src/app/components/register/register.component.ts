import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  frmRegister:FormGroup = new FormGroup({ });
  constructor(private router:Router,private SrvLogin:LoginService) {
    this.frmRegister=new FormGroup({
      name:new FormControl('',[Validators.required]),
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      phonNumber:new FormControl('', [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')]),
      email:new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      address:new FormControl('',[Validators.required]),

    })
  }
  
  register(){
  let user =new User()
  user.name=this.frmRegister.controls['name'].value
  user.userName=this.frmRegister.controls['userName'].value
  user.password=this.frmRegister.controls['password'].value
  user.phonNumber=this.frmRegister.controls['phonNumber'].value
  user.email=this.frmRegister.controls['email'].value
  user.address=this.frmRegister.controls['address'].value
  this.SrvLogin.register(user).subscribe(res=>{
    if(res!=false){
      this.router.navigate(['login'])
    }
  })
  }
}
