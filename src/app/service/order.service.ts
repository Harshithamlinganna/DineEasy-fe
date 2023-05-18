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
  
}

