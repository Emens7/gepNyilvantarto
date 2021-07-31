import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service.model';
import { Vehicle } from '../../../apiservice/model/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../apiservice/api/service.service';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editservice',
  templateUrl: './editservice.page.html',
  styleUrls: ['./editservice.page.scss'],
})
export class EditservicePage implements OnInit {

  serviceId: string;
  service: ServiceModel = new ServiceModel();
  vehicleId: string;

  constructor(
    private route: ActivatedRoute,
    private readonly serviceService: ServiceService,
    public toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    if(this.serviceId) {
      this.loadService(this.serviceId);
    }
  }

  showMessage() {
    this.toastController.create({
      message: 'A mentés sikeres!',
      duration: 2000,
      color: 'success'
    }).then(t => t.present());

    this.router.navigate(['/service', this.vehicleId]);
  }

  loadService(id: string) {
    this.serviceService.getServiceById(id)
      .pipe(first()).subscribe( service => {
        this.service = service;
      })
  }

  save() {
    if (!this.serviceId) {
      this.serviceService.createService({...this.service, vehicleId: this.vehicleId})
        .pipe(first()).subscribe( service => {
          this.showMessage();
        })
    } else {
      this.serviceService.updateService(this.serviceId, { ...this.service, vehicleId: this.vehicleId})
        .pipe(first()).subscribe( serviceUpdate => {
          this.showMessage();
        })
    }
  }

}
