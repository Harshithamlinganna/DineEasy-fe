import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantDataService } from '../service/restaurant-data.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  selectedItems: any = [];
  restaurantName: String;
  restaurantLocation: String;
  resId: String;
  
  constructor(private route: ActivatedRoute, 
      private restaurantDataService: RestaurantDataService,
      private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const itemsJson = params['items'];
      this.resId = params['resId'];
      this.selectedItems = itemsJson ? JSON.parse(itemsJson) : [];
      console.log("selectedItems:", this.selectedItems);
      const restaurantData = this.restaurantDataService.getRestaurantData();
      if (restaurantData) {
        this.restaurantName = restaurantData.name;
        this.restaurantLocation = restaurantData.location;
      }
    });
  }
  

  generateInvoiceContent(): string {
    let invoiceContent = 'Invoice\n\n';
  
    invoiceContent += `${this.restaurantName}\n`;
    invoiceContent += `${this.restaurantLocation}\n\n`;
    invoiceContent += '------------------------\n\n';
  
    invoiceContent += 'Selected Items:\n';
    for (const item of this.selectedItems) {
      invoiceContent += `- ${item.name} - ${item.price}\n`;
    }
  
    invoiceContent += '\nTotal: ' + this.calculateTotal();
    return invoiceContent;
  }
  
  
  
  downloadInvoice() {
    const invoiceContent = this.generateInvoiceContent();
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoice.txt';
    link.click();
  }
  
  calculateTotal(): number {
    return this.selectedItems.reduce((total: any, item: { price: any; }) => total + item.price, 0);
  }
  
  goBack() {
    this.router.navigate(['/restaurants', this.resId]);
  }
  
}
