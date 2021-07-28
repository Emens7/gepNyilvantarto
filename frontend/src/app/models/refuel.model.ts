import { RefuelData } from '../../apiservice/model/refuelData';
import { Refuel } from '../../apiservice/model/refuel';


export class RefuelModel implements RefuelData {
  odometerValue: number;
  fuelAmount: number;
  price: number;
  refuelDate: string;
  notes?: string;
  vehicleId: string;

}

export interface RefuelWithStats extends Refuel {
  pricePerLiter: number
}
