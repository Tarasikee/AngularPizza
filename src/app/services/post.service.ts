import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IPizza} from '../Interfaces/pizza';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {
  }

  category = new BehaviorSubject<string>('all');
  sort = new BehaviorSubject<number>(0);

  pizzas$ = new BehaviorSubject<IPizza[]>([]);

  getPizzas(params?: any): Subscription {
    return this.http.get<IPizza[]>('http://localhost:3000/pizzas', {params})
      .subscribe(pizzas => this.pizzas$.next(pizzas));
  }
}
