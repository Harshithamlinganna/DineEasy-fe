import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IMenuModelAngular from '../interfaces/IMenuModelAngular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  hostUrl:string = environment.hostUrl;
  constructor(private httpClient: HttpClient) { }
  
  getMenu(resId: string) {
    return this.httpClient.get<IMenuModelAngular[]>( this.hostUrl + 'restaurants/' + resId + '/menu');
  }

}
