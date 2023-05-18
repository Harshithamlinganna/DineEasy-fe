import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantOverviewComponent } from './restaurant-overview/restaurant-overview.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';

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
      { path: 'reservation', 
        component: ReservationComponent,
      },
      { path: 'reservation-details',
      component: ReservationDetailsComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
