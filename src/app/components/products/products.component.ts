import { Component, OnInit, ViewChild,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductService } from 'src/app/services/product.service';
import { CartShoppingService } from 'src/app/services/cart-shopping.service';
import { product } from 'src/app/models/product'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
  
export class ProductsComponent implements OnInit {

  load: boolean; 
  products: any[] = [];
  filtro_valor = '';
  pageActual: number = 1;

  constructor(
    private firestore: AngularFirestore,
    private  _productsService: ProductService,
    private _cartService: CartShoppingService) {
    this.load = true;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
     this._productsService.getProducts().subscribe(data => {
        data.forEach((element: any) => {
          this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.load = false;
    });
  }

  addCart(product:product) 
  {
    this._cartService.addProductCartShopping(product,1);
  }

  viewProduct(product:any) {
    console.log("Ver producto: " + product.id);
  }

    handleSearch(value:string) {
    this.filtro_valor = value;
    console.log(this.filtro_valor);
  }

}
