import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServiceService } from 'src/apiservice';
import { Service } from 'src/apiservice/model/models';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {

  vehicleId? : string;
  services: Service[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly serviceService: ServiceService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.getServices();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('vehicleId');
    })
  }

  getServices() {
    this.serviceService.listServices(this.vehicleId)
      .pipe(first()).subscribe((services) => {
        this.services = services;
      })
  };

  requestDelete(id: string) {
    this.serviceService.deleteService(id)
      .pipe(first()).subscribe(() => {
        this.getServices();

        this.toastController.create({
          message: 'A törlés sikeres',
          duration: 3000,
          color: 'warning'
        }).then(t => t.present());

      })
  }

  async deleteService(id: string) {
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
