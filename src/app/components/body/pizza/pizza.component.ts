import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  @Input() id!: string;
  @Input() imageUrl!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() types!: Array<number>;
  @Input() sizes!: Array<number>;

  availableTypes = [0, 1];
  currentType!: number;

  availableSizes = [26, 30, 40];
  currentSize!: number;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.currentSize = this.sizes[0];
    this.currentType = this.types[0];
  }

  onTypeClick(pizzaType: number): void {
    this.currentType = pizzaType;
  }

  onSizeClick(pizzaSize: number): void {
    this.currentSize = pizzaSize;
  }

  addToCart(): void {
    this.cartService.add({
      name: this.name,
      imageUrl: this.imageUrl,
      type: this.currentType,
      size: this.currentSize,
      price: this.price,
      amount: 1
    });
  }
}
