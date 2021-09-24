import { Component, OnInit, ViewChild,EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
  
export class ProductsComponent implements OnInit {

  load: boolean; 
  items!: Observable<any[]>;
  products: any[] = [];
  filtro_valor = '';
  pageActual: number = 1;

  constructor(
    private firestore: AngularFirestore,
    private  _productsService: ProductService) {
    this.load = true;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
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

  addCart(product:any) 
  {
    // Guardo el objeto como un string
    localStorage.setItem('producto', JSON.stringify(product));

  }

  viewProduct(product:any) {
    console.log("Ver producto: " + product.id);
  }

    handleSearch(value:string) {
    this.filtro_valor = value;
    console.log(this.filtro_valor);
  }

}
