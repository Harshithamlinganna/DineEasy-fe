import { Injectable } from '@angular/core';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDataService {
  private readonly restaurantStorageKey = 'restaurantData';

  constructor() { }

  setRestaurantData(restaurant: IRestaurantModelAngular) {
    localStorage.setItem(this.restaurantStorageKey, JSON.stringify(restaurant));
  }

  getRestaurantData(): IRestaurantModelAngular | null {
    const restaurantData = localStorage.getItem(this.restaurantStorageKey);
    return restaurantData ? JSON.parse(restaurantData) : null;
  }

  clearRestaurantData() {
    localStorage.removeItem(this.restaurantStorageKey);
  }
}
