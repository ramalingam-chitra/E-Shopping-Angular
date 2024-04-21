import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/service/cart.service';
import { ModalPopupService } from 'src/app/service/modalPopup.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  dialogRef!: MatDialogRef<any>;
  constructor(private cartService : CartService, private modalPopupService :  ModalPopupService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  addMore(){
    this.dialogRef = this.modalPopupService.openPopup<ProductsComponent>(ProductsComponent, null);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
