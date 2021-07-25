export * from './refuel.service';
import { RefuelService } from './refuel.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './vehicle.service';
import { VehicleService } from './vehicle.service';
export const APIS = [RefuelService, UserService, VehicleService];
