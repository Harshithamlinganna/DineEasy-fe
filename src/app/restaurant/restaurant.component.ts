import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { RestaurantService } from '../service/restaurant.service';
import { RestaurantDataService } from '../service/restaurant-data.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  restaurant: IRestaurantModelAngular;

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService,
    private restaurantDataService: RestaurantDataService
  ) {}

  ngOnInit() {
    const resId = this.route.snapshot.paramMap.get('resId')!;
    console.log("resId ", resId);
    this.service.getRestaurantDetailsById(resId).subscribe(
      data => {
        this.restaurant = data
        console.log("restaurant", this.restaurant.name)
        this.restaurantDataService.setRestaurantData(this.restaurant);
      }
    );
  }
}
