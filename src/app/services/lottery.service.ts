import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Present } from '../models/present.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Lottery } from '../models/lottery.model';
import { UserDto } from '../models/userDto.model';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(private http:HttpClient) { }

  getAllWinner():Observable<Lottery[]>{
    let url='https://localhost:7041/api/Lottery'
    return this.http.get<Lottery[]>(url, { withCredentials: true });
  }


  lotteryUser(p:Present):Observable<UserDto>{
    let url='https://localhost:7041/api/Lottery'
    return this.http.post<UserDto>(url,p, { withCredentials: true });
  }


}
