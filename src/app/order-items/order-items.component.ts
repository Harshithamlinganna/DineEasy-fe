import { Component, NgModule } from '@angular/core';
import { MenuItemsService }  from '../service/menu-items.service';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order.service';
import { IOrderModel } from '../interfaces/IOrderModelAngular';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
  providers: [MenuItemsService]
})


export class OrderItemsComponent {
  menuItems: Observable<IMenuItemsModelAngular[]>
  menuId: string | null = null;
  resId: string | null = null;
  OrderItems: any = {};
  selectedItems: { itemId: String; category: String; name: String; price: number; is_veg: boolean; ingredients: String; }[];

  constructor(
    private menuItemsService$: MenuItemsService, 
    private OrderService$: OrderService,
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

  sendOrder()
  {
    // this.OrderService$.postOrder(this.OrderItems, this.resId).subscribe(response => {
    // })
    console.log("OrderSubmitted");
    const data = this.menuItems.filter(item => item.selected)
    this.menuItems
      .subscribe((menuItemsData: IMenuItemsModelAngular[]) => {
        const selectedItems = menuItemsData[0].menu.filter(item => item.selected);
        this.selectedItems = selectedItems;})
  }
}
