import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../apiservice/api/notification.service';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { NotificationModel } from 'src/app/models/notification.model';

@Component({
  selector: 'app-editnotification',
  templateUrl: './editnotification.page.html',
  styleUrls: ['./editnotification.page.scss'],
})
export class EditnotificationPage implements OnInit {

  vehicleId?: string;
  notificationId: string;
  notification: NotificationModel = new NotificationModel();

  constructor(
    private route: ActivatedRoute,
    private readonly notificationService: NotificationService,
    public toastController: ToastController,
    public router: Router
  ) { }


  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId');
    this.notificationId = this.route.snapshot.paramMap.get('notificationId');
    if (this.notificationId) {
      this.loadNotification(this.notificationId);
    }
  };

  showMessage() {
    this.toastController.create({
      message: 'A mentés sikeres!',
      duration: 2000,
      color: 'success'
    }).then(t => t.present());

    this.router.navigate(['/notification', this.vehicleId]);
  }

  loadNotification(id: string) {
    this.notificationService.getNotificationById(id)
      .pipe(first()).subscribe( notification => {
        this.notification = notification;
      })
  }

  save() {
    if (!this.notificationId) {
       this.notificationService.createNotification({...this.notification, vehicleId: this.vehicleId})
      .pipe(first()).subscribe( fuel => {
        this.showMessage();
      })
    } else {
      this.notificationService.updateNotification(this.notificationId, { ...this.notification, vehicleId: this.vehicleId})
        .pipe(first()).subscribe( notificationUpdate => {
          this.showMessage();
        })
    }

  }


}
