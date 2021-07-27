import { VehicleData } from '../../apiservice/model/vehicleData';
export class VehicleModel implements VehicleData {
  make: string;
  model: string;
  manufactureYear: number;
  licensePlate: string;
  vin?: string;
}
