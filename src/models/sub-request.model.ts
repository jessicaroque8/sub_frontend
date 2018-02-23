import { Sendee } from './sendee.model';
import { User } from './user.model';
import { Group } from './group.model';
// import { AuthProvider } from '../providers/auth/auth';

export class SubRequest {
  id: number;
  user: User = new User();
  group: Group = new Group();
  class_id_mb: number;
  class_name: string;
  start_date_time: string;
  end_date_time: string;
  note: string;
  awaiting_confirm: boolean;
  closed: boolean;
  created_at: string;
  updated_at: string;
  sender_image: string;
  sendees: Array<Sendee> = [];
  reply_counts: Object;

  // get currentUserSendee() {
  //    return this.findCurrentUserSendee();
  // }
  //
  // findCurrentUserSendee() {
  //    for (let sendee of sendees) {
  //       for (let s of self.sendees) {
  //         if (s.user.id == this.auth.currentUser.id) {
  //            let sendee= {};
  //            sendee = s;
  //            return sendee;
  //           };
  //        }
  //     }
  //  }

}
