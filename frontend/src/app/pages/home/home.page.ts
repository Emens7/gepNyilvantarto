import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Vehicle } from 'src/apiservice';
import { VehicleService } from '../../../apiservice/api/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(
    private readonly vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.listVehicles()
      .pipe(first()).subscribe((vehicles) => {
        this.vehicles = vehicles;
      })
  }
}
