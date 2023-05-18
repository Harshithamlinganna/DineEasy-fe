import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';


@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  hostUrl:string = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }
  
  getMenuItems(resId: string, menuId: string) {
    console.log("Here")
    return this.httpClient.get<IMenuItemsModelAngular[]>( this.hostUrl + 'restaurants/' + resId + '/menu/' + menuId + '/items');
  }
}
