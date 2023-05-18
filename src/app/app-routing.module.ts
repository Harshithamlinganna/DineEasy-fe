import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'restaurants', component: RestaurantsComponent},
  { path: 'restaurants/:id', component: RestaurantComponent, children: [
    {path: '', redirectTo: '/overview', pathMatch: 'full' },
    { path: 'overview', component: RestaurantOverviewComponent },
    { path: 'order', component: OrderComponent }
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes), [RouterModule.forChild(routes)]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
