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
      private router: Router,
      private service: RestaurantService
    ) {}
  
    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id')!;
      console.log("id ", id);
      this.service.getRestaurantDetailsById(id).subscribe(
        data => {
          this.restaurant = data
          console.log("restaurant", this.restaurant.name)
        }
      );
    }
  
}
