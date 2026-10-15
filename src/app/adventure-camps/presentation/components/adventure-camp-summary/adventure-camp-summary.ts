import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Reservation } from '../../../../reservations/domain/model/reservation.entity';
import { AdventureCamp } from '../../../domain/model/adventure-camp.entity';

/** Summary card for a camp, its reservations, and its remaining capacity. */
@Component({
  selector: 'app-adventure-camp-summary',
  standalone: true,
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './adventure-camp-summary.html',
  styleUrl: './adventure-camp-summary.css',
})
export class AdventureCampSummary {
  readonly camp = input.required<AdventureCamp>();
  readonly reservations = input.required<Reservation[]>();

  readonly totalParticipants = computed(() =>
    this.reservations().reduce((total, reservation) => total + Number(reservation.participants), 0),
  );

  readonly availableCapacity = computed(() =>
    Math.max(0, this.camp().capacity - this.totalParticipants()),
  );
}
