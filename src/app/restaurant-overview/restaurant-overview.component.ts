import { Component } from '@angular/core';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { RestaurantService } from '../service/restaurant.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.css']
})
export class RestaurantOverviewComponent {
    restaurant: IRestaurantModelAngular;
  
    constructor(
      private route: ActivatedRoute,
      private service: RestaurantService
    ) {}
  
    ngOnInit() { 
      const resId = this.route.parent?.snapshot.paramMap.get('resId')!;
      console.log("resId ", resId);
      this.service.getRestaurantDetailsById(resId).subscribe(
        data => {
          this.restaurant = data
          console.log("restaurant", this.restaurant.name)
        }
      );
    }
}
