import { Injectable } from '@angular/core';
import { Present } from '../models/present.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { QueryParamsHandling } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PresentService {
  private callToGetPresentSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  callToGetPresent$: Observable<boolean> = this.callToGetPresentSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  setGetPresent() {
    let flag = this.callToGetPresentSubject.value;
    this.callToGetPresentSubject.next(!flag);
  }
    

  getPresents(): Observable<Present[]> {
    let url = 'https://localhost:7041/api/Presents';
    return this.http.get<Present[]>(url, { withCredentials: true })
  }

  getById(id: number): Observable<Present> {
    let url = 'https://localhost:7041/api/Presents/' + id
    return this.http.get<Present>(url, { withCredentials: true });
  }

  addPresrent(p: Present) {
    let url = 'https://localhost:7041/api/Presents';
    return this.http.post(url, p, { withCredentials: true })
  }

  updatePresent(p: Present) : Observable<Present>{
    let url = 'https://localhost:7041/api/Presents';
    return this.http.put<Present>(url, p, { withCredentials: true })
  }

  deletePresnt(id: number) {
    let url = `https://localhost:7041/api/Presents/${id}`
    return this.http.delete<boolean>(url, { withCredentials: true });
  }

  deletePresentsSelect(selectedPresents: Present[]) {
    let url = `https://localhost:7041/api/Presents?`;
    for (let i = 0; i < selectedPresents.length; i++) {
      url += `presents=${selectedPresents[i].id}`
      i != selectedPresents.length - 1 && (url += '&');
    } return this.http.delete<boolean>(url, { withCredentials: true });
  }

  showInfo(item:Present):Observable<number>{
    let url = `https://localhost:7041/api/Cart/GetNumOfpurchaser?presentId=${item.id}`
    return this.http.get<number>(url, { withCredentials: true });
  }


  sortPurchased(): Observable<Present[]> {
    let url = 'https://localhost:7041/api/Cart/FilterMaxAcquired';
    return this.http.get<Present[]>(url, { withCredentials: true })
  }

  sortPrice(): Observable<Present[]> {
    let url = 'https://localhost:7041/api/Cart/FilterMaxPrice';
    return this.http.get<Present[]>(url, { withCredentials: true })
  }
  // filterPresent(text:string): Observable<Present[]> {
  //   var token= localStorage.getItem('token')
  //   const headers = { 'Authorization': `bearer ${token}`}
  //   let url = 'https://localhost:7041/api/Presents/filterPresent?presentCategory='+text;
  //   return this.http.get<Present[]>(url,{headers})
  // }


}

