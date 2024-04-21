import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {orders} from 'src/app/shared/data/orders'

@Component({
  selector: 'app-order-list',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrderListComponent implements OnInit {
  
  constructor(private router: Router) { }
  orderList : any [] = [];
  ngOnInit(): void {
    this.orderList = orders;
    console.log("order data : ", orders)
  }
  redirectToDetailsPage(orderId: string) {
    //this.router.navigate(["cart"]);
   this.router.navigate(["cart"], {
      queryParams: { id: orderId},
    });
  }
}
