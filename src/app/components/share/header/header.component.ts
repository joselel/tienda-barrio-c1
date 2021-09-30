import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartShoppingService } from 'src/app/services/cart-shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  hidden = false;
  cantidad:number = 0;
  total:number = 0;
  
  constructor(
    public auth: AuthService,
    public _cartService: CartShoppingService
  ) { }

  ngOnInit(): void {
    this._cartService.contador.subscribe(cantidad =>{
      this.cantidad = cantidad;
    });
    this._cartService.total.subscribe(total =>{
      this.total = total;
    })
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  login() {
    this.auth.login();
  }

  logout() {this.auth.logout()}

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  
}
