import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getAllRestaurants() {
    return this.httpClient.get<IRestaurantModelAngular[]>(this.hostUrl + 'restaurants');
  }

  getRestaurantDetailsById(index: string){
    return this.httpClient.get<IRestaurantModelAngular>(this.hostUrl + 'restaurants/' + index)
  }
}
