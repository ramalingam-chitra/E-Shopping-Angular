import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/service/cart.service';
import { ModalPopupService } from 'src/app/service/modalPopup.service';
import { ActivatedRoute } from '@angular/router';
import { allProducts } from 'src/app/shared/data/products';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  shopMore: boolean = false;
  dialogRef!: MatDialogRef<any>;
  orderId: string | null | undefined;
  orderDetails: any;
  productDetails: any;
  constructor(private activatedRoute: ActivatedRoute, private cartService : CartService, private modalPopupService :  ModalPopupService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe( paramMap => {
      this.orderId = paramMap.get('id');
    })
    this.orderDetails = this.cartService.getOrderDetails(this.orderId);
    this.cartService.getOrderDetails(this.orderId)
    .subscribe((res: any)=>{
      this.products.push(...res.items);
      this.mapProductDetails();
      this.grandTotal = res.total;
    })
    console.log("products list : ", this.productDetails);
    console.log("Product in order : ", this.products);

  }
  getTotalPrice() {
    debugger;
    let total = 0;
    this.products.map((a:any)=>{
        total += (a.total);
    })
    this.grandTotal =  total;
  }

  mapProductDetails() {
    allProducts.map((a:any)=>{
    this.products.map((b:any)=>{
      if(a.id === b.productId){
        b.description = a.description;
        b.unitPrice = a.price;
        b.image = a.image;
      }
    })
  })
  }

  removeItem(item: any){
    this.products.map((a:any, index:any)=>{
      if(item.productId === a.productId){
        this.products.splice(index,1);
      }
    })
    this.getTotalPrice();
  }

  emptycart(){
    this.products = [];
    this.grandTotal = 0;
  }

  addMore(){
    this.shopMore = true;
  }

  incrementQty(item: any){
    this.products.map((a:any)=>{
      if(item.productId === a.productId){
        a.quantity ++;
        a.total = (a.unitPrice * a.quantity).toFixed(2);
      }
    })
    this.getTotalPrice();
  }

  decrementQty(item: any){
    this.products.map((a:any)=>{
      if(item.productId === a.productId){
        if(a.quantity === 0) this.removeItem(item);
        if(a.quantity > 0) a.quantity --;
        a.total = (a.unitPrice * a.quantity).toFixed(2);
      }
    })
    this.getTotalPrice();
  }
  updateCart(newProduct: any){
    console.log("event : ", newProduct)
    this.products.push(...[newProduct]);
    
    this.mapProductDetails();
  }

  placeOrder() {
    window.alert("Order has been placed. Your order id: " +this.orderId);
  }

}
