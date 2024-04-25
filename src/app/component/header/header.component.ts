import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  /* Function: logout
  * Desc: Ask for user confirmation and logout of application
  * Params: none
  * Return: none
  */
  logout() {
    window.alert("You have items in your cart, do you want to logout without placing order?")
  }
}
