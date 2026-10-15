import { ActivityType } from '../../shared/domain/activity-type';

/** Reservation data exchanged with json-server. */
export interface ReservationResource {
  id: string | number;
  adventureCampId: string | number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export type CreateReservationRequest = Omit<ReservationResource, 'id'>;
