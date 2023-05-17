import { Component } from '@angular/core';
import { Observable, of} from 'rxjs';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  resId: string;
  restaurants: Observable<IRestaurantModelAngular[]> ;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getAllRestaurants().subscribe(data => {
      this.restaurants = of(data.slice(0, 4));
    });
  }

  showAllCards() {
    
  }

}
