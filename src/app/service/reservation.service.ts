import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  {IReservationModelAngular}  from '../interfaces/IReservationModelAngular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  hostUrl:string = environment.hostUrl;

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation: IReservationModelAngular): Observable<IReservationModelAngular> {
    console.log("reservation", reservation)
    return this.httpClient.post<IReservationModelAngular>(this.hostUrl + 'addreservation', reservation);
  }
}
