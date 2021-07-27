import { RefuelData } from '../../apiservice/model/refuelData';


export class RefuelModel implements RefuelData {
  odometerValue: number;
  fuelAmount: number;
  price: number;
  refuelDate: string;
  notes?: string;
  vehicleId: string;

}
