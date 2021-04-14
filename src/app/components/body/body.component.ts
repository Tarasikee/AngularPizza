import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPizza} from '../../Interfaces/pizza';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {

  pizzas!: IPizza[];

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    if (!this.postService.pizzas$.getValue().length) {
      this.postService.getPizzas();
    }
    this.postService.pizzas$.subscribe(pizza => this.pizzas = pizza);
  }

  ngOnDestroy(): void {
    this.postService.pizzas$.next(this.pizzas);
  }
}
