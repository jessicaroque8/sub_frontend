import { Reply } from './reply.model';

export class Sendee {
   id: number;
   user_id: number;
   sub_request_id: number;
   sub: boolean;
   confirmed: boolean;
   created_at: string;
   updated_at: string;
   reply: Reply;
   image: string;
   first_name: string;
   last_name: string;
}
