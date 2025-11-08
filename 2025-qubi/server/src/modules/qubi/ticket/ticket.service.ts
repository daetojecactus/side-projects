import { Injectable } from '@nestjs/common';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { TicketRepository } from './ticket.repository';
import { Ticket } from './ticket.schema';
import { TicketCreateDto } from './dto/ticket-create.dto';
import { TicketCreateCorpDto } from './dto/ticket-create-corp.dto';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async findOne(filter: Partial<Ticket>) {
    return this.ticketRepository.findOne(filter);
  }

  async find(filter?: Partial<Ticket>) {
    return this.ticketRepository.find(filter);
  }

  async findByAccount(accountId: number) {
    return this.ticketRepository.find({ accountId });
  }

  createPublic(dto: TicketCreateDto, accountId: number) {
    const ticket = { ...dto, accountId };
    return this.ticketRepository.create(ticket);
  }

  createCorp(dto: TicketCreateCorpDto, adminId: number) {
    const ticket = { ...dto, adminId };
    return this.ticketRepository.create(ticket);
  }

  async updateOne(
    filter: Partial<Ticket>,
    partialTicket: Partial<OmitTimestamps<Ticket>>,
  ) {
    return this.ticketRepository.updateOne(filter, partialTicket);
  }

  async deleteOne(filter: Partial<Ticket>): Promise<{ deletedCount: number }> {
    return this.ticketRepository.deleteOne(filter);
  }
}
