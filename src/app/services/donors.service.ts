import { Injectable } from '@angular/core';
import { Donor } from '../models/donor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {
  private callToGetDonorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetDonors$: Observable<boolean> = this.callToGetDonorsSubject.asObservable();

  constructor(private http:HttpClient,) {}
   
   
  setGetDonors() {
    let flag = this.callToGetDonorsSubject.value;
    this.callToGetDonorsSubject.next(!flag);
  } 
   token= localStorage.getItem('token')

   getDonors() : Observable<Donor[]>{
    let url='https://localhost:7041/api/Donors'
    return this.http.get<Donor[]>(url, { withCredentials: true });
   }

   getById(id: string):  Observable<Donor>{ 
    let url='https://localhost:7041/api/Donors/'+id
    return this.http.get<Donor>(url, { withCredentials: true });
   }

   addDonor(d:Donor){
    let url = 'https://localhost:7041/api/Donors';
    return this.http.post(url,d, { withCredentials: true })
   }

   updateDonor(d:Donor){

    let url = 'https://localhost:7041/api/Donors'
    return this.http.put(url, d, { withCredentials: true })
   }

   deleteDonor(item:Donor){
      let url='https://localhost:7041/api/Donors/'+item.id
      return this.http.delete<boolean>(url, { withCredentials: true });
   }

   deleteDonorsSelect(selectedDonors:Donor[]){
      let url = `https://localhost:7041/api/Donors?`;
    for (let i = 0; i < selectedDonors.length; i++) {
      url += `donors=${selectedDonors[i].id}`
      i != selectedDonors.length - 1 && (url += '&');
    } 
    return this.http.delete<boolean>(url, { withCredentials: true });
  }
    
 
}
