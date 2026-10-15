import { ActivityType } from '../../../shared/domain/activity-type';

/** Information about an adventure camp and its maximum capacity. */
export interface AdventureCamp {
  id: string | number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;
}
