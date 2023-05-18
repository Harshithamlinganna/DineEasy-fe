import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IMenuModelAngular from '../interfaces/IMenuModelAngular';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  hostUrl:string = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }
  
  getMenu(resId: string) {
    return this.httpClient.get<IMenuModelAngular[]>( this.hostUrl + 'restaurants/' + resId + '/menu');
  }

}
