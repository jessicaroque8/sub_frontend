import { Sendee } from './sendee.model';
import { User } from './user.model';
import { Group } from './group.model';
import { SelectedSub } from './selected-sub.model';

export class SubRequest {
  id: number;
  user: User = new User();
  group: Group = new Group();
  class_id_mb: number;
  class_name: string;
  start_date_time: string;
  end_date_time: string;
  note: string;
  closed: boolean;
  created_at: string;
  updated_at: string;
  sender_image: string;
  sendees: Array<Sendee> = [];
  reply_counts: Object;
  selected_sub: SelectedSub;

}
