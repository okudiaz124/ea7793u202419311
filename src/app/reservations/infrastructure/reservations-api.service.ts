import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewReservation, Reservation } from '../domain/model/reservation.entity';

/** Reads and creates camp reservations through the local API. */
@Injectable({ providedIn: 'root' })
export class ReservationsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiBaseUrl}/reservations`;

  list(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.endpoint);
  }

  create(reservation: NewReservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.endpoint, reservation);
  }
}
