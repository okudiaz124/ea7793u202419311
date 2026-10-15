import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { AdventureCamp } from '../../adventure-camps/domain/model/adventure-camp.entity';
import { NewReservation, Reservation } from '../domain/model/reservation.entity';
import { ReservationsApiService } from '../infrastructure/reservations-api.service';

/** Validates available capacity against the current reservations before creating a record. */
@Injectable({ providedIn: 'root' })
export class ReservationRegistrationService {
  private readonly reservationsApi = inject(ReservationsApiService);

  create(
    camp: AdventureCamp,
    participantName: string,
    participants: number,
    weatherTemperature: number,
  ): Observable<Reservation> {
    const name = participantName.trim();
    if (!name || !Number.isInteger(participants) || participants <= 0 ||
        !Number.isFinite(weatherTemperature)) {
      return throwError(() => new Error('Invalid reservation data'));
    }

    return this.reservationsApi.list().pipe(
      map(reservations => {
        const reservedParticipants = reservations
          .filter(reservation => String(reservation.adventureCampId) === String(camp.id))
          .reduce((total, reservation) => total + Number(reservation.participants), 0);

        if (participants > camp.capacity - reservedParticipants) {
          throw new Error('Not enough available capacity');
        }

        const newReservation: NewReservation = {
          adventureCampId: camp.id,
          activityType: camp.activityType,
          participantName: name,
          participants,
          weatherTemperature,
          reservedAt: new Date().toISOString(),
        };
        return newReservation;
      }),
      switchMap(reservation => this.reservationsApi.create(reservation)),
    );
  }
}
