import { Component} from '@angular/core';
import { MenuItemsService }  from '../service/menu-items.service';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import SelectedMenuItem from '../interfaces/SelectedMenuItem'
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
  providers: [MenuItemsService, OrderService]
})

export class OrderItemsComponent {
  menuItems: Observable<IMenuItemsModelAngular[]>
  menuId: string | null = null;
  resId: string | null = null;
  quantity: Number;
  itemIds: String[];
  selectedItems: SelectedMenuItem[] = [];
  showInvoiceButton: boolean = false;
  data: any[] = [];


  constructor(
    private menuItemsService$: MenuItemsService, 
    private OrderService$: OrderService,
    private route: ActivatedRoute,
    private router: Router   
  ) {};

  ngOnInit():void {

    // empty the selected items
    this.itemIds = [];
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

  toggleSelection(itemId: any) {
    this.menuItems.subscribe(items => {
      const menuItem = items[0].menu.find(item => item.itemId === itemId);
      if (menuItem) {
        if (this.isSelected(itemId)) {
          this.selectedItems = this.selectedItems.filter(item => item.itemId !== itemId);
        } else {
          this.selectedItems.push({
            itemId: menuItem.itemId,
            name: menuItem.name,
            price: menuItem.price,
            category: menuItem.category
          });
        }
      }
    });
  }
  //check if the item is selected
  isSelected(itemId:any){
    return this.selectedItems.includes(itemId);
  }

  sendOrder()
  {
    console.log("OrderSubmitted");

    this.itemIds =  this.selectedItems.map(item => item.itemId)
    //calculate quantity
    this.quantity = this.itemIds.length;

    let data = {
      "customerId": "asdasdasd",
      quantity: this.quantity,
      itemIds: this.itemIds,
    }
    this.OrderService$.postOrder(data, this.resId, this.menuId).subscribe(response => {
      console.log("response:",response);
      this.showInvoiceButton = true;
    });
  }

  showInvoice() {
    // Convert selectedItems to JSON string
    const itemsJson = JSON.stringify(this.selectedItems);
    
    // Pass the selected items as query parameters when navigating to the InvoiceComponent
    this.router.navigate(['/invoice'], { queryParams: { items: itemsJson, resId: this.resId } });
  }
}
