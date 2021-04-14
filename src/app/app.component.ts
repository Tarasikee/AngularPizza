import {Component} from '@angular/core';
import {PostService} from './services/post.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>`,
  providers: [PostService]
})
export class AppComponent {
}
