import { first } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { RefuelService } from '../../../apiservice/api/refuel.service';
import { Refuel } from 'src/apiservice';

@Component({
  selector: 'app-refuel',
  templateUrl: './refuel.page.html',
  styleUrls: ['./refuel.page.scss'],
})
export class RefuelPage implements OnInit, OnDestroy {

  vehicleId? : string;
  params: Subject<ParamMap>;
  refuels: Refuel[] = [];

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

  ngOnDestroy() {
    if (this.params) {
      this.params.unsubscribe();
    }

  }

  getRefuels() {
    this.refuelService.listRefuels(this.vehicleId)
      .pipe(first()).subscribe((refuels) => {
        this.refuels = refuels;
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
