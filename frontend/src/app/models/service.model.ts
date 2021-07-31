import { ServiceData } from '../../apiservice/model/serviceData';

export class ServiceModel implements ServiceData {
  summary: string;
  serviceDate: string;
  odometerValue: number;
  expense: number;
  description?: string;
  vehicleId: string;

}
