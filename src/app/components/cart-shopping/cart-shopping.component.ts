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
  total:number = 0;
  
  constructor(
    public _cartService: CartShoppingService,
    public readonly swalTargets: SwalPortalTargets
    ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  addOneUnit(item:any){
    this.products = this._cartService.addOneUnit(item);
    this.getTotal(this.products);
  }

  removeOneUnit(item: any){
    this.products = this._cartService.removeOneUnit(item);
    if(this.products.length == 0){
      this._cartService.deleteAllCartShopping();
      this._cartService.contador.emit(0);
      this._cartService.total.emit(0);
     }else{
      this.getTotal(this.products);
      this._cartService.contador.emit(this.products.length);
     }
  }

  addCart(product:product) 
  {
   this.products = this._cartService.addProductCartShopping(product,1);
   this.getTotal(this.products);
  }

  getProductList(){
    this.products = this._cartService.getProductCartShopping();
    this.getTotal(this.products);
  }

  deleteAllProductList(){
    this.products = this._cartService.deleteAllCartShopping();
    this._cartService.contador.emit(0);
    this._cartService.total.emit(0);
  }

  deleteOneProductList(product: product){
   this.products = this._cartService.deleteOneCartShopping(product);
   if(this.products.length == 0){
    this._cartService.deleteAllCartShopping();
    this._cartService.contador.emit(0);
    this._cartService.getTotal(this.products);
   }else{
    this._cartService.contador.emit(this.products.length);
    this._cartService.getTotal(this.products);
   } 
  }

  getTotal(products:any){
    this.total = 0;
    for(let i = 0; i < products.length; i++){
      this.total += products[i].subtotal;
    }
      this._cartService.contador.emit(products.length);
      this._cartService.total.emit(this.total);
  }

}
