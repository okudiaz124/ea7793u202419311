import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Reservation } from '../../reservations/domain/model/reservation.entity';
import { ReservationsApiService } from '../../reservations/infrastructure/reservations-api.service';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { AdventureCampsApiService } from '../infrastructure/adventure-camps-api.service';

/** Shares camp and reservation data through Angular Signals. */
@Injectable({ providedIn: 'root' })
export class AdventureCampsStore {
  private readonly campsApi = inject(AdventureCampsApiService);
  private readonly reservationsApi = inject(ReservationsApiService);

  readonly camps = signal<AdventureCamp[]>([]);
  readonly reservations = signal<Reservation[]>([]);
  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly loadError = signal(false);

  load(): void {
    this.loading.set(true);
    this.loadError.set(false);

    forkJoin({
      camps: this.campsApi.list(),
      reservations: this.reservationsApi.list(),
    }).subscribe({
      next: ({ camps, reservations }) => {
        this.camps.set(camps);
        this.reservations.set(reservations);
        this.loaded.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.loaded.set(false);
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  reservationsFor(camp: AdventureCamp): Reservation[] {
    return this.reservations().filter(
      reservation => String(reservation.adventureCampId) === String(camp.id),
    );
  }

  totalParticipants(camp: AdventureCamp): number {
    return this.reservationsFor(camp).reduce(
      (sum, reservation) => sum + reservation.participants, 0,
    );
  }

  availableCapacity(camp: AdventureCamp): number {
    return Math.max(0, camp.capacity - this.totalParticipants(camp));
  }
}
