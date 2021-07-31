import { NotificationData } from '../../apiservice/model/notificationData';


export class NotificationModel implements NotificationData {
  notificationDate: string;
  subject: string;
  vehicleId: string;

}
