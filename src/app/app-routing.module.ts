import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [

  { path: 'inicio', component: HomeComponent },
  { path: 'producto', component: ProductComponent},
  { path: 'productos', component: ProductsComponent },
  { path: 'carrito-de-compras', component: CartShoppingComponent },
  { path: 'mis-pedidos', component: OrdersComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: '**', redirectTo:'inicio', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
