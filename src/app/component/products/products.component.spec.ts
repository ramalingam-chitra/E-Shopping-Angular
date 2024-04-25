import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if addToCart emits the selected product details', () => {
    const emitSpy = spyOn(component.selectedProduct, 'emit');
    component.addtocart({
      "id": "A101",
      "description": "Screwdriver",
      "category": "1",
      "price": 9.75,
      "image":"assets/img/screwdriver.jpeg"
    },)
    expect(emitSpy).toHaveBeenCalled();    
  });
});
