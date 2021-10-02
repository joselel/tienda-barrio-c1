import { EventEmitter, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class CartShoppingService {

  Listproducts:any[] = [];
  item: any;
  key: string = "shopping_cart";
  totalS:number = 0;
  contador:EventEmitter<number> = new EventEmitter();
  total:EventEmitter<number> = new EventEmitter();


  constructor() { }

  removeOneUnit(item:any){
    const Listproducts = localStorage.getItem("shopping_cart");
    let existe = this.Listproducts.find(element => element.product.name === item.product.name);

    if(existe){
      existe.unit -= 1;  
      existe.subtotal = existe.unit * existe.product.price_sale;
      if(existe.unit == 0){
        this.deleteOneCartShopping(existe);
      }else{
        localStorage.setItem(this.key, JSON.stringify(this.Listproducts));
      }
    }
    
    return this.Listproducts;
  }

  addOneUnit(item:any){
    const Listproducts = localStorage.getItem("shopping_cart");
    let existe = this.Listproducts.find(element => element.product.name === item.product.name);
    
    if(existe){
      existe.unit += 1; 
      existe.subtotal = existe.unit * existe.product.price_sale; 
      localStorage.setItem(this.key, JSON.stringify(this.Listproducts));
    }

    return this.Listproducts;
  }

  addProductCartShopping(product:any,unit:number){

    let item = {
      product:product,
      unit:unit,
      subtotal: product.price_sale * unit
    }

    const Listproducts = localStorage.getItem("shopping_cart");

    if(Listproducts == null || Listproducts.length == 0){
      
      this.Listproducts.push(item);
      localStorage.setItem(this.key, JSON.stringify(this.Listproducts));
      this.contador.emit(this.Listproducts.length);
      this.getTotal();
      this.successNotification("Añadiste "+item.product.name + " al carrito");
    }else{
      this.Listproducts = JSON.parse(Listproducts);
        if(this.Listproducts.length >= 1){
          let existe = this.Listproducts.find(element => element.product.name === item.product.name);
            if(existe){
              existe.unit += item.unit;  
              existe.subtotal = existe.unit * item.product.price_sale;
              this.contador.emit(this.Listproducts.length);
              localStorage.setItem(this.key, JSON.stringify(this.Listproducts));
              this.getTotal();
              this.successNotification("Añadiste una unidad mas de "+item.product.name + " al carrito");
              
            }else{
            this.Listproducts.push(item);
            this.contador.emit(this.Listproducts.length);
            localStorage.setItem(this.key, JSON.stringify(this.Listproducts));
            this.getTotal();
            this.successNotification("Añadiste "+item.product.name + " al carrito");
            
            }
        }      
    }
    return this.Listproducts;
  }

  getProductCartShopping(){
    const Listproducts = localStorage.getItem("shopping_cart");
    if(Listproducts == null){
      this.Listproducts = []
    }else{
      this.Listproducts = JSON.parse(Listproducts);
      this.contador.emit(this.Listproducts.length);
    }
    return this.Listproducts;
  }

  deleteOneCartShopping(product:any){

    this.Listproducts = this.getProductCartShopping();

    for(let i = 0; i < this.Listproducts.length; i++){
      
      if(product.product.id == this.Listproducts[i].product.id){
        this.Listproducts.splice(i,1);
        if(this.Listproducts != null || this.Listproducts <= 0){
          localStorage.removeItem("shopping_cart");
          localStorage.setItem("shopping_cart",JSON.stringify(this.Listproducts));
        }
      }
    }
    return this.Listproducts;
  }

  deleteAllCartShopping(){
    localStorage.removeItem("shopping_cart");
    this.Listproducts = [];
    return this.Listproducts;
  }

  successNotification(mensaje:string){
    Swal.fire({
      title: 'Listo!',
      text: mensaje,
      icon: 'success',
      showConfirmButton: false,
      timer: 700
    })
  }

  getTotal(){
   const products = this.getProductCartShopping();

    this.totalS = 0;
    for(let i = 0; i < products.length; i++){
      this.totalS += products[i].subtotal;
    }
      this.total.emit(this.totalS);
  }

}
