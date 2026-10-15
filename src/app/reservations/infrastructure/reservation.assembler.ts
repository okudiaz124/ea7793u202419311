import { NewReservation, Reservation } from '../domain/model/reservation.entity';
import { CreateReservationRequest, ReservationResource } from './reservation.resource';

/** Maps reservation requests and responses to domain objects. */
export class ReservationAssembler {
  static toEntity(resource: ReservationResource): Reservation {
    return {
      id: resource.id,
      adventureCampId: resource.adventureCampId,
      activityType: resource.activityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: resource.reservedAt,
    };
  }

  static toRequest(entity: NewReservation): CreateReservationRequest {
    return {
      adventureCampId: entity.adventureCampId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt,
    };
  }
}
