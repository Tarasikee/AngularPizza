import {Injectable} from '@angular/core';
import {IOrderPizza} from '../Interfaces/cart';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  order: IOrderPizza[] = [];
  readyOrder$ = new BehaviorSubject<IOrderPizza[]>([]);

  add(pizza: IOrderPizza): void {
    this.order.push(pizza);

    const merged = [...this.order.reduce((r: Map<string, IOrderPizza>, orderPizza: IOrderPizza) => {
      const key = orderPizza.name + '-' + orderPizza.size + '-' + orderPizza.type;

      const item = r.get(key) || Object.assign({}, orderPizza, {
        amount: 0,
      });

      item.amount += orderPizza.amount;

      return r.set(key, item);
    }, new Map()).values()];

    this.readyOrder$.next(merged);
  }

  clear(): void {
    this.order = [];
    this.readyOrder$.next(this.order);
  }

  delete(pizza: IOrderPizza): void {
    const temp = this.readyOrder$.getValue();
    temp.forEach(orderPizza => {
      if (JSON.stringify(orderPizza) === JSON.stringify(pizza)) {
        const index = temp.indexOf(orderPizza, 0);
        index > -1 && temp.splice(index, 1);
      }
    });
    this.order = temp;
    this.readyOrder$.next(temp);
  }

  decrement(pizza: IOrderPizza): void {
    const temp = this.readyOrder$.getValue();
    temp.forEach(orderPizza => {
      if (JSON.stringify(orderPizza) === JSON.stringify(pizza)) {
        if (orderPizza.amount > 1) {
          orderPizza.amount--;
          return;
        }
        temp.indexOf(orderPizza, 0) > -1 && temp.splice(temp.indexOf(orderPizza, 0), 1);
      }
    });
    this.order = temp;
    this.readyOrder$.next(temp);
  }

  increment(pizza: IOrderPizza): void {
    this.readyOrder$
      .getValue()
      .forEach(orderPizza => JSON.stringify(orderPizza) === JSON.stringify(pizza) && orderPizza.amount++);

    this.order = this.readyOrder$.getValue();
    this.readyOrder$.next(this.readyOrder$.getValue());
  }
}
