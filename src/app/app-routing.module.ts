import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditPresentComponent } from './components/edit-present/edit-present.component';
import { PresentsListComponent } from './components/presents-list/presents-list.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { EditDonorComponent } from './components/edit-donor/edit-donor.component';
import { PresentsPurchaseComponent } from './components/presents-purchase/presents-purchase.component';
import { CartComponent } from './components/cart/cart.component';
import { RandomComponent } from './components/random/random.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'presentsList',component:PresentsListComponent,children:[
    {path:'editPresent/:id',component:EditPresentComponent},
    {path:'addPresent',component:EditPresentComponent},
  ]},
  {path:'donorsList',component:DonorsListComponent,children:[
    {path:'editDonor/:id',component:EditDonorComponent},
    {path:'addDonor',component:EditDonorComponent}]},
  {path:'payment',component:PaymentComponent},
  {path:'presentsPurchase',component:PresentsPurchaseComponent},
  {path:'cart',component:CartComponent},
  {path:'paying',component:PaymentComponent},
  {path:'random',component:RandomComponent},
  {path:'report',component:ReportComponent},
  {path:'users',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
