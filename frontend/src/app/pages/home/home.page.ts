import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { Vehicle } from 'src/apiservice';
import { VehicleService } from '../../../apiservice/api/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  vehicles: Vehicle[] = [];

  constructor(
    private readonly vehicleService: VehicleService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.listVehicles()
      .pipe(first()).subscribe((vehicles) => {
        this.vehicles = vehicles;
      })
  }

  requestDelete(id: string) {
    this.vehicleService.deleteVehicle(id)
      .pipe(first()).subscribe(() => {
        this.getVehicles();

        this.toastController.create({
          message: 'A törlés sikeres!',
          duration: 2000,
          color: 'warning'
        }).then(t => t.present());

      })
  }

  async deleteVehicle(id: string) {
    const alert = await this.alertController.create({
      header: 'Törlés',
      message: 'Biztosan akarja törölni a kiválasztott elemet?',
      buttons: [
        {
          text: 'Igen',
          handler: () => {
           this.requestDelete(id);
          }
        },
        {
          text: 'Nem'
        }
      ]
    });

    await alert.present();

  }
}
