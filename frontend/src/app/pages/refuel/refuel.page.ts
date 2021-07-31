import { first } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RefuelService } from '../../../apiservice/api/refuel.service';
import { Refuel } from 'src/apiservice';
import { RefuelWithStats } from '../../models/refuel.model';

@Component({
  selector: 'app-refuel',
  templateUrl: './refuel.page.html',
  styleUrls: ['./refuel.page.scss'],
})
export class RefuelPage implements OnInit {

  vehicleId? : string;
  refuels: RefuelWithStats[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly refuelService: RefuelService,
    public alertController: AlertController,
    public toastController: ToastController
    ) { }

  ionViewWillEnter() {
    this.getRefuels()
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('vehicleId');
    });
  }

  processRefuelData(refuels: Refuel[]) {
    return refuels.map((refuel: Refuel) => {
      return {
        ...refuel,
        pricePerLiter: refuel.fuelAmount / refuel.price
      }
    });
  }

  getRefuels() {
    this.refuelService.listRefuels(this.vehicleId)
      .pipe(first()).subscribe((refuels) => {
        this.refuels = this.processRefuelData(refuels);
      })
  }

  requestDelete(id: string) {
    this.refuelService.deleteRefuel(id)
     .pipe(first()).subscribe( () => {
       this.getRefuels();

       this.toastController.create({
        message: 'A törlés sikeres!',
        duration: 2000,
        color: 'warning'
      }).then(t => t.present());

     })
  }

  async deleteRefuel(id: string) {
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
