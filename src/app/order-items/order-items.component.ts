import { Component, NgModule } from '@angular/core';
import { MenuItemsService }  from '../service/menu-items.service';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { IOrderModel } from '../interfaces/IOrderModelAngular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
  providers: [MenuItemsService, OrderService]
})

export class OrderItemsComponent {
  menuItems: Observable<IMenuItemsModelAngular[]>
  menuId: String;
  resId: string | null;
  quantity: Number;
  itemIds: String[];
  selectedItems: any[] = [];
  invoiceItems: any[] = [];
  itemsSubmitted: boolean = false;

  constructor(
    private menuItemsService$: MenuItemsService, 
    private OrderService$: OrderService,
    private route: ActivatedRoute,
    private router: Router  
  ) {};

  ngOnInit(): void {
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
      if(this.resId && this.menuId) {
        this.menuItemsService$.getMenuItems(this.resId, this.menuId).subscribe((data: IMenuItemsModelAngular[]) => {
          this.menuItems = of(data);
        });
      }
    });
  }

  toggleSelection(itemId: String, price: number, name: String): void {
    if (this.isSelected(itemId)) {
      this.selectedItems = this.selectedItems.filter(item => item !== itemId);
      this.invoiceItems = this.invoiceItems.filter(item => item.itemId !== itemId);
      console.log("deselect the item from the invoiceItems array  ---", this.invoiceItems )
      console.log("deselect the item from the array to selectedItems ---", this.selectedItems )
    } else {
      this.selectedItems.push(itemId);
      this.invoiceItems.push({ itemId, name, price });
      console.log("successfully added the items to invoiceItems", this.invoiceItems)
      console.log("successfully added the items to selectedItems", this.selectedItems)
    }
  }

  // check if the item contains in the selected.
  isSelected(itemId: any): boolean {
    return this.selectedItems.includes(itemId);
  }

  sendOrder(): void {
    if (this.selectedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    this.itemIds = this.selectedItems;
    // calculate quantity
    this.quantity = this.itemIds.length;

    let data = {
      "customerId": "asdasdasd",
      quantity: this.quantity,
      itemIds: this.itemIds,
    }
    console.log(data);
    this.OrderService$.postOrder(data, this.resId, this.menuId).subscribe(response => {
      console.log(response);
      this.itemsSubmitted = true; 
    });
  }

  generateInvoice(): void {
    if (this.invoiceItems.length === 0) {
      console.log('No items selected for the invoice');
      return;
    }

    console.log('Generating invoice...', this.invoiceItems);
    this.router.navigate(['/invoice'], { queryParams: { items: JSON.stringify(this.invoiceItems), resId: this.resId } });
  }
}
