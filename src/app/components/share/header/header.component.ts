import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  hidden = false;
  
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
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
