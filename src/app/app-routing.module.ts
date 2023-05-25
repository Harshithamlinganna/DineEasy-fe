import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';
import { OrderComponent } from './order/order.component';
import { OrderItemsComponent } from './order-items/order-items.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'restaurants', component: RestaurantsComponent},
  { 
    path: 'restaurants/:resId', 
    component: RestaurantComponent, 
    children: [
      { 
        path: '', 
        redirectTo: 'overview', 
        pathMatch: 'full'
      },
      { 
        path: 'overview', 
        component: RestaurantOverviewComponent 
      },
      { 
        path: 'menu', 
        component: MenuComponent, 
      },
      {
        path: 'menu/:menuId/items', 
        component: MenuItemsComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'menu/:menuId/items/order',
        component: OrderItemsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
