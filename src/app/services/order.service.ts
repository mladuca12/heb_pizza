import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export class Order {
  constructor(
    public crust: string,
    public flavor: string,
    public size: string,
    public tableNumber: number,
    public id?: number,
    public timeStamp?: string
  ) {}
}

interface OrderResponse {
  Order_ID: number;
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
  Timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http
      .post<OrderResponse>('https://pizza-api-app.herokuapp.com/api/orders', {
        Crust: order.crust,
        Flavor: order.flavor,
        Size: order.size,
        Table_No: order.tableNumber,
      })
      .pipe(
        map(
          (response) =>
            new Order(
              response.Crust,
              response.Flavor,
              response.Size,
              response.Table_No,
              response.Order_ID,
              response.Timestamp
            )
        )
      );
  }

  getOrders() {}

  deleteOrder(id: number) {}
}
