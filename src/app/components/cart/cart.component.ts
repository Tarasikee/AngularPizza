import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IOrderPizza} from '../../Interfaces/cart';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    cart!: IOrderPizza[];
    price!: number;
    amount!: number;

    constructor(
        private cartService: CartService
    ) {
    }

    ngOnInit(): void {
        this.cartService.readyOrder$.subscribe(pizzas => {
            this.cart = pizzas;

            let total = 0;
            let amount = 0;
            pizzas.map(pizza => {
                total += pizza.amount * pizza.price;
                amount += pizza.amount;
            });
            this.price = total;
            this.amount = amount;
        });
    }

    decrement(pizza: IOrderPizza): void {
        this.cartService.decrement(pizza);
    }

    increment(pizza: IOrderPizza): void {
        this.cartService.increment(pizza);
    }

    delete(pizza: IOrderPizza): void {
        this.cartService.delete(pizza);
    }

    pay(): void {
        console.log('Спасибо за заказ');
        console.log(this.cart);
    }
}
