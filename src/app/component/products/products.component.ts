import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
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

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.productList = allProducts;
      console.log(this.productList)

  }
  addtocart(item: any){
    //this.cartService.addtoCart(item);
    this.selectedProduct.emit(item);
  }
 

}
