import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AdventureCampsStore } from '../../../../adventure-camps/application/adventure-camps.store';
import { ACTIVITY_TYPES, ActivityType } from '../../../../shared/domain/activity-type';
import { OpenMeteoApiService } from '../../../../weather/infrastructure/open-meteo-api.service';
import { ReservationRegistrationService } from '../../../application/reservation-registration.service';

/** Form for creating reservations with the camp's real current weather. */
@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css',
})
export class NewReservation {
  private readonly router = inject(Router);
  private readonly weatherApi = inject(OpenMeteoApiService);
  private readonly registration = inject(ReservationRegistrationService);

  readonly store = inject(AdventureCampsStore);
  readonly activities = ACTIVITY_TYPES;
  readonly selectedActivity = signal<ActivityType | null>(null);
  readonly temperature = signal<number | null>(null);
  readonly weatherLoading = signal(false);
  readonly weatherError = signal(false);
  readonly formError = signal(false);
  readonly saving = signal(false);

  private requestSequence = 0;

  readonly form = new FormGroup({
    activityType: new FormControl<ActivityType | null>(null, Validators.required),
    participantName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    participants: new FormControl<number | null>(1, [Validators.required, Validators.min(1)]),
  });

  readonly selectedCamp = computed(() =>
    this.store.camps().find(camp => camp.activityType === this.selectedActivity()) ?? null,
  );

  readonly availableCapacity = computed(() => {
    const camp = this.selectedCamp();
    return camp ? this.store.availableCapacity(camp) : 0;
  });

  constructor() {
    if (!this.store.loaded()) {
      this.store.load();
    }
  }

  selectActivity(activityType: ActivityType): void {
    this.selectedActivity.set(activityType);
    this.temperature.set(null);
    this.weatherError.set(false);
    this.formError.set(false);

    const sequence = ++this.requestSequence;
    const camp = this.selectedCamp();

    if (!camp) {
      this.weatherLoading.set(false);
      this.weatherError.set(true);
      return;
    }

    this.weatherLoading.set(true);
    this.weatherApi.currentTemperature(camp).subscribe({
      next: temperature => {
        if (sequence !== this.requestSequence) return;
        this.temperature.set(temperature);
        this.weatherLoading.set(false);
      },
      error: () => {
        if (sequence !== this.requestSequence) return;
        this.weatherLoading.set(false);
        this.weatherError.set(true);
      },
    });
  }

  submit(): void {
    if (this.saving()) return;

    this.form.markAllAsTouched();
    this.formError.set(false);

    const camp = this.selectedCamp();
    const temperature = this.temperature();
    const participants = this.form.controls.participants.value;
    const participantName = this.form.controls.participantName.value.trim();

    if (this.form.invalid || !camp || temperature === null ||
        this.weatherLoading() || this.weatherError() ||
        !participantName || participants === null || !Number.isInteger(participants) ||
        participants <= 0 || participants > this.availableCapacity()) {
      this.formError.set(true);
      return;
    }

    this.saving.set(true);
    this.registration.create(camp, participantName, participants, temperature).subscribe({
      next: () => {
        this.store.load();
        void this.router.navigateByUrl('/home');
      },
      error: () => {
        this.formError.set(true);
        this.saving.set(false);
        this.store.load();
      },
    });
  }

  cancel(): void {
    void this.router.navigateByUrl('/home');
  }
}
