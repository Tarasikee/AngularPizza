import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  price!: number;
  amount!: number;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.cartService.readyOrder$.subscribe(pizzas => {
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
}
