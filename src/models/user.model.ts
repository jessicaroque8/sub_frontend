import { Group } from './group.model';
import { Sendee } from './sendee.model';
import { SubRequest } from './sub-request.model';

export class User {
   email: string;
   first_name: string;
   id: number;
   image: string;
   last_name: string;
   provider: string;
   staff_id_mb: number;
   uid: string;
   updated_at: string;
   groups: Array<Group>;
   sub_requests: Array<SubRequest>;
   sendees: Array<Sendee>;
}
