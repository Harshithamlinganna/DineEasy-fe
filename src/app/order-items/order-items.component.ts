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
  providers: [MenuItemsService, OrderService],
})

export class OrderItemsComponent {
  menuItems: Observable<IMenuItemsModelAngular[]>
  menuId: string | null = null;
  resId: string | null = null;
  quantity: Number;
  itemIds: String[];
  selectedItems: any[] = [];

  constructor(
    private menuItemsService$: MenuItemsService, 
    private OrderService$: OrderService,
    private route: ActivatedRoute    
  ) {};

  ngOnInit():void {

    // empty the selected items
    this.itemIds = [];
    this.selectedItems = [];
    // Get resId param from parent component [Menu]
    this.route.parent?.params.subscribe(params => {
      this.resId = params['resId'];
    });

    this.route.params.subscribe(params => {

      // Get the menuId param from the current route
      this.menuId = params['menuId'];

      // Request menu items for that restaurant using the menu items service
      if(this.resId && this.menuId)
      {
        this.menuItemsService$.getMenuItems(this.resId, this.menuId).subscribe((data: IMenuItemsModelAngular[]) => {
          this.menuItems = of(data);
        });
      }
    });
  }

  // check if the 
  toggleSelection(itemId:any){
    if(this.isSelected(itemId)){
      this.selectedItems = this.selectedItems.filter(item => item !== itemId);
    }else{
      this.selectedItems.push(itemId);
    }
  }

  //check if the item is selected
  isSelected(itemId:any){
    return this.selectedItems.includes(itemId);
  }

  sendOrder()
  {
    console.log("OrderSubmitted");

    this.itemIds = this.selectedItems;
    //calculate quantity
    this.quantity = this.itemIds.length;

    let data = {
      "customerId": "asdasdasd",
      quantity: this.quantity,
      itemIds: this.itemIds,
    }
    this.itemIds = [];
    this.selectedItems = [];
    console.log(data);
    this.OrderService$.postOrder(data, this.resId, this.menuId).subscribe(response => {
      console.log(response);
    });
  }
}
