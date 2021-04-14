import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BodyComponent} from './components/body/body.component';
import {CartComponent} from './components/cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import {ChoiceComponent} from './components/body/choice/choice.component';
import {PizzaComponent} from './components/body/pizza/pizza.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {FormsModule} from '@angular/forms';
import {SumPipe} from './pipes/sum.pipe';
import { TopComponent } from './components/cart/top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CartComponent,
    ChoiceComponent,
    PizzaComponent,
    SumPipe,
    TopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClickOutsideModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
