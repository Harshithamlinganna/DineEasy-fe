import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemsComponent } from './menu-items/menu-items.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'restaurants', component: HomeComponent},
  { path: 'restaurants/:resId/menu', component: MenuComponent},
  { path: 'restaurants/:resId/menu/:menuId/items', component: MenuItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
