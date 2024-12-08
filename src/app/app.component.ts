import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PresentService } from './services/presents.service';
import { Present } from './models/present.model';
import { NavigationEnd, Route, Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService,MessageService,PresentService]
})
export class AppComponent {
 title='chineesOction'
 routes:Route[]=[]
 showNavigate: boolean = true;
  isAdmin: boolean = false;
 constructor(private router: Router,private SrvLog:LoginService){
  this.router.events.subscribe((e)=>{
    if( e instanceof NavigationEnd){
      console.log(e);
      if(e.url == '/' || e.url == '/register' || e.url == '/login'){
        this.showNavigate = false;
      }
      else{
        this.showNavigate = true;
      }
      if(SrvLog.statuse == 'Admin')
         this.isAdmin = true
      if(SrvLog.statuse == 'User')
         this.isAdmin = false;
    }
  })
}

}
