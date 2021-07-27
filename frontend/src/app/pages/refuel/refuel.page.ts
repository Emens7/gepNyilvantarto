import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-refuel',
  templateUrl: './refuel.page.html',
  styleUrls: ['./refuel.page.scss'],
})
export class RefuelPage implements OnInit, OnDestroy {

  vehicleId? : string;
  params: Subject<ParamMap>;

  constructor(private route: ActivatedRoute) { }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('vehicleId');
    })
  }

  ngOnDestroy() {
    if (this.params) {
      this.params.unsubscribe();
    }

  }

}
