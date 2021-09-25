import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(public auth: AuthService) { }
  
  ngOnInit() {
  }
  
  login() {this.auth.login();}

  logout() {this.auth.logout();}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
