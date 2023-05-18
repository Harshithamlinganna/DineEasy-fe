import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  resId: string;
  restaurants: Observable<IRestaurantModelAngular[]>;
  showAllRestaurant: IRestaurantModelAngular[];
  filteredRestaurants: Observable<IRestaurantModelAngular[]>;
  searchTerm: string = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getAllRestaurants().subscribe(data => {
      this.showAllRestaurant = data;
      this.restaurants = of(data.slice(0, 4));
      this.filteredRestaurants = this.restaurants;
    });
  }

  showAllCards() {
    this.restaurants = of(this.showAllRestaurant);
    this.filteredRestaurants = this.restaurants;
  }

  filterRestaurants() {
    if (this.searchTerm) {
      // Filter restaurants based on the search term
      this.filteredRestaurants = this.restaurants.pipe(
        map(restaurants => restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          restaurant.cuisines.toLowerCase().includes(this.searchTerm.toLowerCase())
        ))
      );
    } else {
      // If the search term is empty, show all restaurants
      this.filteredRestaurants = this.restaurants;
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterRestaurants();
  }
}
