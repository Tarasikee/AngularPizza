import {Component} from '@angular/core';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  constructor(private cartService: CartService) {
  }

  clearCart(): void {
    if (confirm('Удалить ваш заказ?')) {
      this.cartService.clear();
    }
  }
}
