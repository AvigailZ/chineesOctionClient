import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lottery } from 'src/app/models/lottery.model';
import { LotteryService } from 'src/app/services/lottery.service';
import { PresentService } from 'src/app/services/presents.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  lotteries:Lottery[]=[]
  constructor(private LotterSrv:LotteryService,private router:Router,private SrvPresent:PresentService) {}
  ngOnInit(){
    this.LotterSrv.getAllWinner().subscribe(res=>{
      //{let upProd=res.map(res=>{this.SrvPresent.getById(res.presentId).subscribe(d=>{res.presentId=d.name});return res});
      this.lotteries=res;
      console.log(res);
      
    })
  }
  back(){
    this.router.navigate(['./random'])
  }

}
