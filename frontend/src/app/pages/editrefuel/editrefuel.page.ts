import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefuelModel } from '../../models/refuel.model';
import { RefuelService } from '../../../apiservice/api/refuel.service';
import { first } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editrefuel',
  templateUrl: './editrefuel.page.html',
  styleUrls: ['./editrefuel.page.scss'],
})
export class EditrefuelPage implements OnInit {

  refuelId: string;
  refuel: RefuelModel = new RefuelModel();
  vehicleId?: string;

  constructor(
    private route: ActivatedRoute,
    private readonly refuelService : RefuelService,
    public toastController: ToastController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
    this.refuelId = this.route.snapshot.paramMap.get('refuelId');
    if (this.refuelId) {
      this.loadRefuel(this.refuelId);
    }
  }

  showMessage() {
    this.toastController.create({
      message: 'A mentés sikeres!',
      duration: 2000,
      color: 'success'
    }).then(t => t.present());

    this.router.navigate(['/refuel', this.vehicleId]);
  }

  loadRefuel(id: string) {
    this.refuelService.getRefuelById(id)
      .pipe(first()).subscribe( refuel => {
        this.refuel = refuel;
      })
  }

  save() {
    if (!this.refuelId) {
       this.refuelService.createRefuel({...this.refuel, vehicleId: this.vehicleId})
      .pipe(first()).subscribe( fuel => {
        this.showMessage();
      })
    } else {
      this.refuelService.updateRefuel(this.refuelId, { ...this.refuel, vehicleId: this.vehicleId})
        .pipe(first()).subscribe( fuelUpdate => {
          this.showMessage();
        })
    }

  }

}
