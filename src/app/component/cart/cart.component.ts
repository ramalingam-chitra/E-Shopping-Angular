import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { allProducts } from 'src/app/shared/data/products';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  shopMore: boolean = false;
  orderId: string | null | undefined;
  orderDetails: any;
  productDetails: any;
  orders: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(paramMap => {
      this.orderId = paramMap.get('id');
    })
    //Call the service and get the dummy data which can be replaced by actual api endpoints
    this.cartService.getOrderDetailsById(this.orderId)
      .subscribe((res: any) => {
        this.products.push(...res.items);
        this.mapProductDetails();
        this.grandTotal = res.total;
      }, (err: any) => {
        console.log("An error is encourtered while fetching data", err);
      })
  }

  /* Function: getTotalPrice
  * Desc: Get the total price of the items in cart whenever changes happen to the cart items
  * Params: none
  * Return: none
  */
  getTotalPrice() {
    let total = 0;
    this.products.map((a: any) => {
      total += Number(a.total);
    })
    this.grandTotal = Number(total.toFixed(2));
  }

  /* Function: mapProductDetails
  * Desc: Map the order items based on the product format
  * Params: none
  * Return: none
  */
  mapProductDetails() {
    allProducts.map((a: any) => {
      this.products.map((b: any) => {
        if (a.id === b.productId) {
          b.description = a.description;
          b.unitPrice = a.price;
          b.image = a.image;
        }
      })
    })
  }

  /* Function: removeItem
  * Desc: Remove the item from cart, called onclick of - sign or delete button
  * Params: none
  * Return: none
  */
  removeItem(item: any) {
    this.products.map((a: any, index: any) => {
      if (item.productId === a.productId) {
        this.products.splice(index, 1);
      }
    })
    this.getTotalPrice();
  }

  /* Function: emptycart
  * Desc: Triggered when the empty cart button is clicked. Clear the products array and set the total to 0. Display the shop more section.
  * Params: none
  * Return: none
  */
  emptycart() {
    this.products = [];
    this.grandTotal = 0;
    this.shopMore = false;
  }

  /* Function: addMore
  * Desc: Set the flag to display the products list
  * Params: none
  * Return: none
  */
  addMore() {
    this.shopMore = true;
  }

  /* Function: incrementQty
  * Desc: Increment the quanity of selected item in cart and update total and grand total
  * Params: none
  * Return: none
  */
  incrementQty(item: any) {
    console.log("item : ", item)
    this.products.map((a: any) => {
      if (item.productId === a.productId) {
        a.quantity++;
        a.total = Number((a.unitPrice * a.quantity).toFixed(2));
      }
    })
    this.getTotalPrice();
  }

  /* Function: decrementQty
  * Desc: Reduce the quanity of selected item in cart and update total and grand total
  * Params: none
  * Return: none
  */
  decrementQty(item: any) {
    this.products.map((a: any) => {
      if (item.productId === a.productId) {
        if (a.quantity > 0) a.quantity--;
        if ((a.quantity) === 0) {
          this.removeItem(item);
        }
        a.total = Number((a.unitPrice * a.quantity).toFixed(2));
      }
    })
    this.getTotalPrice();
  }

  /* Function: updateCart
  * Desc: Called when add to cart is clicked from products section. Update the cart and total.
  * Params: none
  * Return: none
  */
  updateCart(newProduct: any) {
    //Check if already the same item is available in cart, if yes increase quantity, else add to cart
    let existingProduct = this.products.find((product: { productId: any; }) => product.productId === newProduct.id)
    if (existingProduct !== undefined) {
      existingProduct.quantity++;
      existingProduct.total = Number((existingProduct.quantity * existingProduct.unitPrice).toFixed(2));
      this.getTotalPrice();
    } else {
      allProducts.map((a: any) => {
        if (a.id === newProduct.id) {
          newProduct.unitPrice = newProduct.price;
          newProduct.productId = newProduct.id;
          newProduct.quantity = 1;
          newProduct.total = Number((a.unitPrice * a.quantity).toFixed(2));
        }
      })
      this.products.push(...[newProduct]);
      this.getTotalPrice();
    }
  }

  /* Function: saveOrder
  * Desc: Save the order before checkout
  * Params: none
  * Return: none
  */
  saveOrder() {
    this.orders = this.cartService.getOrdersList();
    console.log("orders : ", this.orders);
  }
  /* Function: placeOrder
  * Desc: Place the order if there is atleast one item in cart
  * Params: none
  * Return: none
  */
  placeOrder() {
    if (this.products.length > 0) {
      window.alert("Order has been placed. Your order id: " + this.orderId);
      this.redirectToOrders();
    } else {
      window.alert("Please add items to cart before checkout ");
    }
  }
  /* Function: redirectToOrders
   * Desc: Redirect to the ordeers page once checkout is done
    * Params: none
   * Return: none
   */
  redirectToOrders() {
    this.router.navigate(["orders"]);
  }
}
