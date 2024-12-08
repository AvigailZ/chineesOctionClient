import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { ResolveData } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  statuse:string=''
  login(email:string,password:string):Observable<Response>{
   let url='https://localhost:7041/api/Users/Login';
    return  this.http.post<Response>(url,{email,password})
  }

  register(user :User):Observable<boolean>{
    let url='https://localhost:7041/api/Users/Register';
    return  this.http.post<boolean>(url,user)
  
  }
    
  
       
}


