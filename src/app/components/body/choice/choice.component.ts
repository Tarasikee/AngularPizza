import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit, OnDestroy {

  @ViewChild('arrowSpan') arrowSpan!: ElementRef;

  pizzaTypes = [
    {pizzaType: 'Все', category: 'all'},
    {pizzaType: 'Мясная', category: '0'},
    {pizzaType: 'Вегетарианская', category: '1'},
    {pizzaType: 'Гриль', category: '2'},
    {pizzaType: 'Острые', category: '3'},
    {pizzaType: 'Закрытые', category: '4'}
  ];

  sortTypes = [
    {by: 'Популярности', sort: 'popular', order: 'desc'},
    {by: 'Цене', sort: 'price', order: 'desc'},
    {by: 'Алфавиту', sort: 'name', order: 'asc'}
  ];

  show = false;
  category!: string;
  sort!: number;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.category = this.postService.category.getValue();
    this.sort = this.postService.sort.getValue();
  }

  ngOnDestroy(): void {
    this.postService.category.next(this.category);
    this.postService.sort.next(this.sort);
  }

  updatePizzas(): void {
    const category = this.category;
    const sort = this.sortTypes[this.sort];

    this.postService.getPizzas({
      category,
      _sort: sort.sort,
      _order: sort.order
    });
  }

  toggleModal(): void {
    this.show = !this.show;
    this.arrowSpan.nativeElement.classList.toggle('active');
  }

  closeModal(): void {
    this.show = !this.show;
    this.arrowSpan.nativeElement.classList.remove('active');
  }
}
