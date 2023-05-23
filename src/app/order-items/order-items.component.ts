import { Component, NgModule } from '@angular/core';
import { MenuItemsService }  from '../service/menu-items.service';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order.service';
import { IOrderModel } from '../interfaces/IOrderModelAngular';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
  providers: [MenuItemsService, OrderService],
})

export class OrderItemsComponent {
  menuItems: Observable<IMenuItemsModelAngular[]>
  menuId: string | null = null;
  resId: string | null = null;
  quantity: Number;
  itemIds: String[] | null;
  selectedItems: any;

  constructor(
    private menuItemsService$: MenuItemsService, 
    private OrderService$: OrderService,
    private route: ActivatedRoute
  ) {};

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

  // sendOrder()
  // {
  //   console.log("OrderSubmitted");

  //     this.menuItems.subscribe((menuItemsData: IMenuItemsModelAngular[]) => {
  //       console.log(this.menuItems);
  //       const selectedItems = menuItemsData[0]?.menu.filter(item => item.selected);
  //       this.selectedItems = selectedItems;
  //       this.itemIds = selectedItems.map(item => item.itemId);
  //     });

  //       //calculate quantity
  //       this.quantity = this.itemIds.length;

  //       let data = {
  //         "customerId": "asdasdasd",
  //         quantity: this.quantity,
  //         itemIds: this.itemIds,
  //       }
  //       console.log(data);
  //       this.OrderService$.postOrder(data, this.resId, this.menuId).subscribe(response => {
  //         console.log(response);
  //       });
  // }
  sendOrder() {
    try {
      console.log("OrderSubmitted");
  
      const queryparams = this.route.snapshot.queryParamMap;
      
      this.itemIds = queryparams.has('menuItem') ? queryparams.getAll('menuItem') : [];
  
      //calculate quantity
      this.quantity = this.itemIds.length;
  
      let data = {
        customerId: "asd",
        quantity: this.quantity,
        itemIds: this.itemIds,
      };
  
      console.log(data);
      this.OrderService$.postOrder(data, this.resId, this.menuId).subscribe(response => {
        console.log(response);
      });
    //});
    } catch (error) {
      console.error("Error while submitting order:", error);
    }
  }
  
}
