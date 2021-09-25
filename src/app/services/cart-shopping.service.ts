import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartShoppingService {

  Listproducts = [];

  constructor() { }

  addProductCartShopping(product:any,unit:number){
    let item = {
      product:product,
      unit:unit
    }
    //Si ya hay Storage lo obtiene y agrega un regsitro nuevo
    if(localStorage.getItem("shopping_cart")){
   
      let Listproducts = JSON.parse(localStorage.getItem("shopping_cart")|| '{}');
      /**Preguntamos si existe el producto en la lista del Storage */
      let count = 1;
      let index:number | any;

      for(const i in Listproducts){
        if(Listproducts[i].product == item.product){
          count --;
          index = i;
        }else{
          count ++;
        }
      }

      if(count == Listproducts.length){
        Listproducts.push(item);
        console.log(item)
      }else{
        Listproducts[index].unit += 1;
        console.log(Listproducts[index]);
        console.log( Listproducts[index].unit += 1);
      }     

      localStorage.setItem("shopping_cart",JSON.stringify(Listproducts));

    }else{
    //Si no hay Storage agrega uno nuevo registro
      let Listproducts = [];
      Listproducts.push(item);
      localStorage.setItem("shopping_cart", JSON.stringify(Listproducts));
    }
  }

  getProductCartShopping(){
    const Listproducts = localStorage.getItem("shopping_cart");
    if(Listproducts == null){
      this.Listproducts = []
    }else{
      this.Listproducts = JSON.parse(Listproducts);
    }
    return this.Listproducts;
  }

  deleteOneCartShopping(product:any){

    // this.Listproducts = this.getProductCartShopping();

    // for(let i = 0; i < this.Listproducts.length; i++){
    //   if(product.id == this.Listproducts[i].product.id){
    //     this.Listproducts.splice(i,1);
    //     if(this.Listproducts != null || this.Listproducts <= 0){
    //       localStorage.removeItem("shopping_cart");
    //       localStorage.setItem("shopping_cart",JSON.stringify(this.Listproducts));
    //     }
    //   }
    // }
    // return this.Listproducts;
    return product;

  }

  deleteAllCartShopping(){
    localStorage.removeItem("shopping_cart");
    this.Listproducts = [];
    return this.Listproducts;
  }

}
