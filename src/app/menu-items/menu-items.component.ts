import { Component } from '@angular/core';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MenuItemsService }  from '../service/menu-items.service'

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css'],
  providers: [MenuItemsService]
})
export class MenuItemsComponent {
  menuItems: Observable<IMenuItemsModelAngular[]>;

  constructor(private menuItemsService$: MenuItemsService, private route: ActivatedRoute) 
  { 
    const resId = route.snapshot.params['resId'];
    const menuId = route.snapshot.params['menuId'];

    this.menuItemsService$.getMenuItems(resId, menuId).subscribe((data: IMenuItemsModelAngular[]) => {
      this.menuItems = of(data);
    });
  }

}
