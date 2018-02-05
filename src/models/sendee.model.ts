import { Reply } from '/reply.model';

export class Sendee {
   user_id: number;
   sub_request_id: number;
   sub: boolean;
   confirmed: boolean;
   created_at: string;
   updated_at: string;
   reply: Reply;
   img: string;
   first_name: string;
   last_name: string;
}
