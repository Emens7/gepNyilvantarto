import { Component, OnInit } from '@angular/core';
import { RefuelModel } from '../../models/refuel.model';

@Component({
  selector: 'app-editrefuel',
  templateUrl: './editrefuel.page.html',
  styleUrls: ['./editrefuel.page.scss'],
})
export class EditrefuelPage implements OnInit {

  refuel: RefuelModel = new RefuelModel();

  constructor() { }

  ngOnInit() {
  }

}
