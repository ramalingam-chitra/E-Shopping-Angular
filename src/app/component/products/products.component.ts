import { Component, OnInit } from '@angular/core';
import { allProducts } from 'src/app/shared/data/products';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  @Output() selectedProduct = new EventEmitter<{}>();

  constructor() { }

  ngOnInit(): void {
    this.productList = allProducts; //Get the const data from mock file instead of api
  }

  /* Function: addtocart
   * Desc: Emit the selected product details to the parent component Cart screen to update the cart
   * Params: Selected item
   * Return: none
   */
  addtocart(item: any){
    this.selectedProduct.emit(item);
  }
 
}
