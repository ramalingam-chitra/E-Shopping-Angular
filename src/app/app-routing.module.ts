import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './component/products/products.component';
import { OrderListComponent} from './component/orders/orders.component';
import { CartComponent } from './component/cart/cart.component';


const routes: Routes = [
  {path:'', redirectTo:'orders', pathMatch:'full'},
  {path:'orders', component: OrderListComponent},
  {path:'products', component: ProductsComponent},
  {path:'cart', component: CartComponent},
  {path:'cart/:id', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
