import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartShoppingService } from 'src/app/services/cart-shopping.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  cantidad:number = 0;
  total:number = 0;
  
  @Output() sidenavClose = new EventEmitter();

  constructor(public auth: AuthService,public _cartService: CartShoppingService) { }
  
  ngOnInit() {
    this._cartService.contador.subscribe(cantidad =>{
      this.cantidad = cantidad;
    });
    this._cartService.total.subscribe(total =>{
      this.total = total;
    })
  }
  
  login() {this.auth.login();}

  logout() {this.auth.logout();}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
