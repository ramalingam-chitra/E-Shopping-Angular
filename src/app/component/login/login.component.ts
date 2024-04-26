import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

   /* Function: redirectToOrders
   * Desc: Redirect to the ordeers page once checkout is done
    * Params: none
   * Return: none
   */
   redirectToOrders() {
    this.router.navigate(["orders"]);
  }
}
