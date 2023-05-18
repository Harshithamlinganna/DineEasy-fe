import { Component, Input } from '@angular/core';
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
  resId: string | null = null;
  constructor(
    private menuItemsService$: MenuItemsService, 
    private route: ActivatedRoute
  ) {}
  
  ngOnInit():void {

    // Get resId param from parent component [Menu]
    this.route.parent?.params.subscribe(params => {
      this.resId = params['resId'];
    });

    this.route.params.subscribe(params => {

      // Get the menuId param from the current route
      const menuId = params['menuId'];

      // Request menu items for that restaurant using the menu items service
      if(this.resId && menuId)
      {
        this.menuItemsService$.getMenuItems(this.resId, menuId).subscribe((data: IMenuItemsModelAngular[]) => {
          this.menuItems = of(data);
        });
      }
    });

   }
}

