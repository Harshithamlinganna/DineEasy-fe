import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Observable<IRestaurantModelAngular[]> ;
  
  
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getItems().subscribe(data => this.restaurants = of(data));
  }

  showAllCards()
  {
    
  }

}
