import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/apiservice/model/models';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../apiservice/api/notification.service';
import { ToastController, AlertController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  vehicleId?: string;
  notifications: Notification[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly notificationService: NotificationService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.getNotifications();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('vehicleId');
    })
  }

  getNotifications() {
    this.notificationService.listNotifications(this.vehicleId)
      .pipe(first()).subscribe((notifications)=> {
        this.notifications = notifications;
      })
  };

  requestDelete(id: string) {
    this.notificationService.deleteNotification(id)
      .pipe(first()).subscribe(() => {
        this.getNotifications();

        this.toastController.create({
          message: 'A törlés sikeres',
          duration: 3000,
          color: 'warning'
        }).then(t => t.present());

      })
  }

  async deleteNotifications(id: string) {
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
