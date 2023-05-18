import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IMenuModelAngular from '../interfaces/IMenuModelAngular';
import { MenuService } from '../service/menu.service';
import { Observable, of} from 'rxjs';
import { MenuItemsService } from '../service/menu-items.service';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService, MenuItemsService]
})

export class MenuComponent implements OnInit {
  menu: Observable<IMenuModelAngular[]>;
  menuItems:  Observable<IMenuItemsModelAngular[]>;
  resId: string | null = null;
  constructor(
    private menuService$: MenuService, 
    private route: ActivatedRoute 
  ) {}
  
  ngOnInit():void { 
    
    // Request menu for a restaurant through the menu service
      this.route.parent?.params.subscribe(params => {
        this.resId = params['resId'];
        if (this.resId) {
          this.menuService$.getMenu(this.resId).subscribe((data: IMenuModelAngular[]) => {
            this.menu = of(data);
          });
        }
      });
  }
    
}
