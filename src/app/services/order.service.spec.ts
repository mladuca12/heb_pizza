import { HttpClient } from '@angular/common/http';
import { OrderService } from './order.service';
import { Order } from '../domain/order';
import { defer } from 'rxjs';

describe('OrderService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let orderService: OrderService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
    ]);
    orderService = new OrderService(httpClientSpy);
  });

  it('should create and return the expected order', (done: DoneFn) => {
    const expectedOrder: Order = {
      crust: 'a crust',
      flavor: 'a flavor',
      size: 'a size',
      tableNumber: 4,
      id: 1,
      timeStamp: 'now',
    };

    const response = {
      Order_ID: 1,
      Crust: 'a crust',
      Flavor: 'a flavor',
      Size: 'a size',
      Table_No: 4,
      Timestamp: 'now',
    };

    httpClientSpy.post.and.returnValue(defer(() => Promise.resolve(response)));

    orderService.createOrder(expectedOrder).subscribe({
      next: (order) => {
        expect(order.timeStamp).toEqual(expectedOrder.timeStamp);
        done();
      },
      error: done.fail,
    });
  });
});
