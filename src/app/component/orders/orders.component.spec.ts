import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './orders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListComponent ],
      imports: [
        RouterTestingModule,
        RouterModule,
        BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check redirectToDetailsPage updates the url and redirects to details page', () => {
    const spyRouter = spyOn(router, 'navigate').and.resolveTo(true);
    component.redirectToDetailsPage(1);
    expect(spyRouter).toHaveBeenCalledWith(["cart"], {
      queryParams: { id: 1},
    });
  });
});
