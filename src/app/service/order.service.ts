import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrderModel } from '../interfaces/IOrderModelAngular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  hostUrl:string = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }
  
  postOrder(data:any, resId:string | null, menuId:any): Observable<any>{
    let url = this.hostUrl + 'restaurants/' + resId + '/menu/' + menuId + '/items/order';
    console.log(url);
    console.log(data);
    return this.httpClient.post<any>(url, data);
  }
}

