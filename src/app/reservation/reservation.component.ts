import { Component } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { IReservationModelAngular } from '../interfaces/IReservationModelAngular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  partySize: number;
  date: string;
  time: string;
  phone: string;
  reservationId: string;
  tableNumber: number;
  isReservationConfirmed: boolean = false;


  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute,) {}

  createReservation() {
    const reservation: IReservationModelAngular = {
      peopleCount: this.partySize,
      date: this.date,
      time: this.time,
      phoneNumber: this.phone,
      reservationId: '',
      customerId: '',
      resId: this.route.parent?.snapshot.paramMap.get('id')!,
      status: 'pending',
      tableNumber: 0,
    };
    

    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        this.reservationId = response.reservationId;
        this.tableNumber = response.tableNumber;
        this.isReservationConfirmed = true;
        this.router.navigate(['/reservation-details'], {
          
          queryParams: {reservationId: this.reservationId, tableNumber: this.tableNumber}
        });
        console.log(response);
        console.log(response.reservationId);
        console.log(response.tableNumber);
      },
      (error) => {
        console.error('Failed to create reservation:', error);
      }
    );
  } 
}
