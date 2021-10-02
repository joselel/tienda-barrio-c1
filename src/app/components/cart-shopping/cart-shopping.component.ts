import { Component, OnInit } from '@angular/core';
import { CartShoppingService } from 'src/app/services/cart-shopping.service';
import { product } from 'src/app/models/product';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2'
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

export interface Order{
  products: any[],
  FechaInicio:Date,
  FechaEntrega:Date,
  Cliente:string | null,
  Direccion:string,
  estado:string,
}

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {

  products!:any[];
  productos!:number;
  total!:number;
  order!:Order;
    
  constructor(
    public auth: AuthService,
    public _cartService: CartShoppingService,
    public readonly swalTargets: SwalPortalTargets,
    private _orderService: OrderService,
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
    this._cartService.getTotal();
   }else{
    this._cartService.contador.emit(this.products.length);
    this._cartService.getTotal();
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

  postOrder(products:any){

    console.log(this.auth);
    if(this.auth){
      
      this.order = {
        products: products,
        FechaInicio:new Date(),
        FechaEntrega:new Date(),
        Cliente: this.auth.usuario.name,
        Direccion:"casa Z-20",
        estado:"Recibido",
      }
      this._orderService.postOrder(this.order).then(() => {
        console.log("se envio la orden correctamete");
      });

    }else{
      this.errorNotification("Deber Iniciar Sesion");
    }
    
  }

  errorNotification(mensaje:string){
    Swal.fire({
      title: 'No estas autenticado!',
      text: mensaje,
      icon: 'error',
      showConfirmButton: false,
      timer: 700
    })
  }

}
