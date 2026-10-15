import { ActivityType } from '../../../shared/domain/activity-type';

/** A registered camp reservation. */
export interface Reservation {
  id: string | number;
  adventureCampId: string | number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export type NewReservation = Omit<Reservation, 'id'>;
