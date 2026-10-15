import { ActivityType } from '../../shared/domain/activity-type';

/** The adventure camp data returned by json-server. */
export interface AdventureCampResource {
  id: string | number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;
}
