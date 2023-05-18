import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  {IReservationModelAngular}  from '../interfaces/IReservationModelAngular';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private hostUrl: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation: IReservationModelAngular): Observable<IReservationModelAngular> {
    return this.httpClient.post<IReservationModelAngular>(this.hostUrl + 'addreservation', reservation);
  }
}
