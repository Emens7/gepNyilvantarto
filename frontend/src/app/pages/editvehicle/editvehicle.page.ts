import { VehicleModel } from './../../models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../apiservice/api/vehicle.service';
import { first } from 'rxjs/operators';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editvehicle',
  templateUrl: './editvehicle.page.html',
  styleUrls: ['./editvehicle.page.scss'],
})
export class EditvehiclePage implements OnInit {

  vehicle: VehicleModel = new VehicleModel();
  vehicleId?: string;

  constructor(
    private readonly vehicleService: VehicleService,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleId = id;
      this.loadVehicle(id);
    }
  }

  showMessage() {
    this.toastController.create({
      message: 'A mentés sikeres!',
      duration: 2000,
      color: 'success'
    }).then(t => t.present());

    this.router.navigate(['/home']);
  }

  save() {
    if (!this.vehicleId) {
      this.vehicleService.createVehicle(this.vehicle)
        .pipe(first()).subscribe(vehicle => {
          this.showMessage();
        });
    } else {
      this.vehicleService.updateVehicle(this.vehicleId, this.vehicle)
        .pipe(first()).subscribe(vehicle => {
          this.showMessage();
        })

    }
  }

  loadVehicle(id: string) {
    this.vehicleService.getVehicleById(id)
      .pipe(first()).subscribe( vehicle => {
        this.vehicle = vehicle;
      })
  }

}
