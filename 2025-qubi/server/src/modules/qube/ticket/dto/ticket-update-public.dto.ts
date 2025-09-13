import { TicketStatus } from '../ticket.interface';

export class TicketUpdateDto {
  title?: string;
  description?: string;
  status?: TicketStatus;
}
