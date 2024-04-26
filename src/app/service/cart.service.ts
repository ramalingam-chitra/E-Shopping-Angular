import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public orderList = new BehaviorSubject<any>([]);
  public orders: any  =  [];

  constructor() { 
    this.orders = [
      {
        "id": "1",
        "customerId": "1",
        "items": [
          {
            "productId": "B102",
            "quantity": 10,
            "unitPrice": 4.99,
            "total": 49.90
          }
        ],
        "total": 49.90
      },
      {
        "id": "2",
        "customerId": "2",
        "items": [
          {
            "productId": "B102",
            "quantity": 5,
            "unitPrice": 4.99,
            "total": 24.95
          }
        ],
        "total": 24.95
      },
      {
        "id": "3",
        "customerId": "3",
        "items": [
          {
            "productId": "A101",
            "quantity": 2,
            "unitPrice": 9.75,
            "total": 19.50
          },
          {
            "productId": "A102",
            "quantity": 1,
            "unitPrice": 49.50,
            "total": 49.50
          }
        ],
        "total": 69.00
      }]
  }

  /* Function: getProducts
   * Desc: Get the dummy data and emit as observable to be used in Cart screen
   * Params: none
   * Return: none
   */
  getProducts(){
    return this.productList.asObservable();
  }

  /* Function: getOrderDetailsById
   * Desc: Send the order details based on given id as observable
   * Params: Id of the selected order
   * Return: none
   */
  getOrderDetailsById(id: any) : any{
    this.orders.map((a:any)=>{
      if(id=== a.id){
        this.orderList.next(a);
      }
    })
    return this.orderList.asObservable();
  }

  /* Function: getOrderDetailsById
   * Desc: Save the order details when the save button is clicked. 
           Routing within application without page refresh will give latest data in cart component
   * Params: Products in the cart, Id of the selected order
   * Return: none
   */
  saveOrder(products: any, orderId: any) {
    let selectedOrder = this.orders.find((order: { id: any }) => order.id === orderId);
    if(products.length === 0) {
      selectedOrder.items = [];
    } else {
      this.orders.map((order: any) => {
        if (orderId === order.id) {
          order.items = products;
        }
      })
    }
  }

}
