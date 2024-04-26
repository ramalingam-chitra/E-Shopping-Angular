import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/service/cart.service';
import { CartMockService } from 'src/app/mock/service/cart.service.mock';
import { of } from 'rxjs';
import { ordersMockData } from 'src/app/mock/data/order.mock.data';
import { By } from '@angular/platform-browser';

describe('CartComponent', () => {
  let component: CartComponent;
  let cartService: CartService;
  let router: Router;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [
        RouterTestingModule,
        RouterModule,
        BrowserAnimationsModule,
      ],
      providers: [{provide: CartService, useClass: CartMockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check oninit mapproductdetails is called', () => {
    const mapproductdetailsSpy = spyOn(component, 'mapProductDetails');
    spyOn(cartService, 'getOrderDetailsById').and.returnValue(
      of(JSON.stringify(ordersMockData[0])));
      cartService.orderList.next( ordersMockData[0]);
    expect(mapproductdetailsSpy).toHaveBeenCalled();
  });

  it('should check if products data is mapped in required format in MapProductDetails method', () => {
    component.products =  ordersMockData[0].items;
    component.mapProductDetails();
    expect(component.products[0].image).toBeDefined();
    expect(component.products[0].unitPrice).toBeDefined();
    expect(component.products[0].description).toBeDefined();
  });

  it('should check if item is removed from cart when delete button is clicked', () => {
    component.products =  ordersMockData[0].items;
    component.mapProductDetails();
    fixture.detectChanges();
    const removeItemSpy = spyOn(component, 'removeItem');
    fixture.debugElement.query(By.css('#deleteBtn')).nativeElement.click();
    expect(removeItemSpy).toHaveBeenCalled();
  });

  it('should check empty cart removes all items', () => {
    component.products =  ordersMockData[0].items;
    component.emptycart();
    fixture.detectChanges();
    expect(component.products.length).toBe(0);
    expect(component.shopMore).toBeFalse;
  });

  it('should check increment qty increased the existing product quantity in cart', () => {
    component.products =  ordersMockData[0].items;
    component.mapProductDetails();
    component.incrementQty(component.products[0]);
    fixture.detectChanges();
    expect(component.products[0].quantity).toBe(11);
  });

  it('should check placeOrder calls the redirectToOrders method', () => {
    component.products = ordersMockData[0].items;
    const redirectSpy = spyOn(component, 'redirectToOrders');
    component.placeOrder();
    expect(redirectSpy).toHaveBeenCalled();
  });

  it('should check redirectToOrders method is not invoked when product length is 0', () => {
    component.products = [];
    const redirectSpy = spyOn(component, 'redirectToOrders');
    component.placeOrder();
    expect(redirectSpy).not.toHaveBeenCalled();
  });

  it('should check redirectToOrders updates the url and redirects to orders', () => {
    const spyRouter = spyOn(router, 'navigate').and.resolveTo(true);
    component.redirectToOrders();
    expect(spyRouter).toHaveBeenCalledWith(["orders"]);
  });

  it('should check save order calls the saveorder method in cart service', () => {
    const saveOrderSpy = spyOn(cartService, 'saveOrder');
    component.saveOrder();
    expect(saveOrderSpy).toHaveBeenCalled();
  });

});
