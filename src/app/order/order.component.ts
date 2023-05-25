import { Component } from '@angular/core';
import { MenuItemsService }  from '../service/menu-items.service'
import { OrderService } from '../service/order.service';
import { MenuComponent } from '../menu/menu.component';
import { Observable, of } from 'rxjs';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import { ActivatedRoute } from '@angular/router';
import IMenuModelAngular from '../interfaces/IMenuModelAngular';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService, MenuService],
})
export class OrderComponent {
  menu: Observable<IMenuModelAngular[]>;
  resId: string | null = null;
  constructor(
    private menuService$: MenuService, 
    private route: ActivatedRoute 
  ){}
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
