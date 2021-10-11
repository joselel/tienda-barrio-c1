import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartShoppingService } from 'src/app/services/cart-shopping.service';
import { product } from 'src/app/models/product';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2'
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

export interface Order{
  userId:string,
  email:string | null,
  products: any[],
  FechaInicio:Date,
  FechaEntrega:Date,
  Cliente:string | null,
  Direccion:string,
  estado:string,
  total:number;
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
    private router: Router
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

  async postOrder(products:any){
    if(
      this.auth.user.name != undefined || this.auth.user.name != null ||
      this.auth.user.email != undefined || this.auth.user.email != null ||
      this.auth.user.uid !=undefined || this.auth.user.uid != null){

        this.order = {
          userId: this.auth.user.uid,
          email: this.auth.user.email,
          products: products,
          FechaInicio:new Date(),
          FechaEntrega:new Date(),
          Cliente: this.auth.user.name,
          Direccion:"casa Z-20",
          estado:"Recibido",
          total: this.total
        }

      this._orderService.postOrder(this.order)
                        .then(() => {
                          this.succesOrderNotification("Tu orden fue enviada correctamente");
                          this.deleteAllProductList();
                          this.router.navigate(["/mis-pedidos"])
                        })
                        .catch(()=>{
                          this.errorNotification("Ocurrio un error en el servidor, intenta en unos minutos", "Error interno");
                        });

    }else{
      this.errorNotification("Debes Iniciar Sesion","No estas Identificado");
    }

  }

  errorNotification(mensaje:string, title:string){
    Swal.fire({
      title: title,
      text: mensaje,
      icon: 'error',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText:'Aceptar'
    })
  }
  succesOrderNotification(mensaje:string){
    Swal.fire({
      title: 'Tu pedido ha sido recibido!',
      text: mensaje,
      icon: 'success',
      showConfirmButton: false,
      showCancelButton: false,
      timer:700
    })
  }
}
