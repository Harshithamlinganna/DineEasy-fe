import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  hostUrl:string = environment.hostUrl;
  
  constructor(private httpClient: HttpClient) { }
  
  getMenuItems(resId: string, menuId: string) {
    console.log("Here")
    return this.httpClient.get<IMenuItemsModelAngular[]>( this.hostUrl + 'restaurants/' + resId + '/menu/' + menuId + '/items');
  }

}
