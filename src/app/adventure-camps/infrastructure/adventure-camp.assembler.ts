import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { AdventureCampResource } from './adventure-camp.resource';

/** Converts API resources into adventure camp entities. */
export class AdventureCampAssembler {
  static toEntity(resource: AdventureCampResource): AdventureCamp {
    return {
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude,
    };
  }
}
