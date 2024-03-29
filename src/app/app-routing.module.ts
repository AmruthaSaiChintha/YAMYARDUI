import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { combineLatest } from 'rxjs';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"footer",component:FooterComponent},
  {path:"contentpage",component:ContentPageComponent},
  {path:"register",component:RegisterComponent},
  {path:"menu",component:MenuComponent},
  {path:"cart",component:CartComponent}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
