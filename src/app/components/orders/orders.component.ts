import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:any = [];
  usuario:any;
  load:boolean = true;
  total:any;
  id_user:any;
  pageActual: number = 1;

  constructor(
    private ordersService: OrderService,
    public auth: AngularFireAuth,
    private _orderService:OrderService
    ) { }

  ngOnInit(): void {
    this.getOrdersUser();
  }

  getOrdersUser(){
    this.ordersService.getUserData().subscribe(User =>{
      if(User){
        this.id_user = User.uid;
        if(this.id_user != null || this.id_user != undefined){

          this.ordersService.getOrdersUser(this.id_user)
            .then((querySnapshot) => {
              this.orders = [];
              querySnapshot.forEach((doc: any) => {
                this.orders.push(doc.data());
                  console.log(this.orders);
                  //console.log(doc.id, " => ", doc.data());
                  });
            })
            .catch((error) => {
              console.log("Error al obtener documentos: ", error);
            });
        }else{
          console.log("Error, no estas logeado");
        }

        }
      });
      }
  }


// this.ordersService.getOrders().subscribe(data => {
//   this.orders = [];
//   data.forEach((element: any) => {
//     this.orders.push({
//     id: element.payload.doc.id,
//     ...element.payload.doc.data()
//   })
// });
// this.load = false;
// console.log(this.orders);
// });
