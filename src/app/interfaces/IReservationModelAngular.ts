export interface IReservationModelAngular {
  reservationId: string;
  customerId: string;
  resId: string;
  date: string;
  time: string;
  peopleCount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  phoneNumber: string;
  tableNumber: number;
}