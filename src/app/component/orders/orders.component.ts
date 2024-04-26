import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {orders} from 'src/app/shared/data/orders'

@Component({
  selector: 'app-order-list',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrderListComponent implements OnInit {
  constructor(private router: Router) {}
  orderList : any [] = [];

  ngOnInit(): void {
    this.orderList = orders;
  }

  /* Function: redirectToDetailsPage
   * Desc: Redirect to the details page when view details button is clicked in order list screen
    * Params: none
   * Return: none
   */
  redirectToDetailsPage(orderId: any) {
   this.router.navigate(["cart"], {
      queryParams: { id: orderId},
    });
  }
}
