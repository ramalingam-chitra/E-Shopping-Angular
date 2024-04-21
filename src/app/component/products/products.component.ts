import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { products } from 'src/app/shared/data/products';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.productList = products;
      console.log(this.productList)

  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
 

}
