import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrderModel } from '../interfaces/IOrderModelAngular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  hostUrl:string = environment.hostUrl;
  constructor(private httpClient: HttpClient) { }
  
  postOrder(data:any, resId:string | null, menuId:string | null): Observable<any>{
    let url = this.hostUrl + 'restaurants/' + resId + '/menu/' + menuId + '/items/order';
    console.log(url);
    console.log(data);
    return this.httpClient.post<any>(url, data);
  }
}

