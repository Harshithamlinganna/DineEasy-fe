import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  hostUrl:string = environment.hostUrl;
  
  constructor(private httpClient: HttpClient) { }

  getAllRestaurants() {
    console.log(this.hostUrl);
    return this.httpClient.get<IRestaurantModelAngular[]>(this.hostUrl + 'restaurants');
  }

  getRestaurantDetailsById(id: string){
    return this.httpClient.get<IRestaurantModelAngular>(this.hostUrl + 'restaurants/' + id)
  }
}
