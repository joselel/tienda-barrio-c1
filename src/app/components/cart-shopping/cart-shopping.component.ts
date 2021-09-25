import { Component, OnInit } from '@angular/core';
import { CartShoppingService } from 'src/app/services/cart-shopping.service';
import { product } from 'src/app/models/product';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2'

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {

  products!:any[];
  productos!:number;
  
  constructor(
    public _cartService: CartShoppingService,
    public readonly swalTargets: SwalPortalTargets) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.products = this._cartService.getProductCartShopping();
  }

  deleteAllProductList(){
    this.products = this._cartService.deleteAllCartShopping();
  }

  deleteOneProductList(product: product){
   this.products = this._cartService.deleteOneCartShopping(product);
  }

  alerta(){
    console.log("todo bien");
  }

}
