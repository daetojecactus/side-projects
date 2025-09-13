import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import { TicketMessages } from './constants/ticket-messages';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async findOne(filter: Partial<Ticket>) {
    return this.ticketModel.findOne(filter);
  }

  async find(filter?: Partial<Ticket>) {
    return this.ticketModel.find(filter ?? {});
  }

  async create(data: Partial<Ticket>) {
    return this.ticketModel.create(data);
  }

  async updateOne(
    filter: Partial<Ticket> & { _id?: string },
    partialTicket: Partial<OmitTimestamps<Ticket>>,
  ) {
    const ticket = await this.ticketModel.findOneAndUpdate(
      filter,
      partialTicket,
      {
        new: true,
      },
    );
    if (!ticket) {
      throw new NotFoundException(TicketMessages.TICKET_NOT_FOUND);
    }
    return ticket;
  }

  async deleteOne(filter: Partial<Ticket>): Promise<{ deletedCount: number }> {
    const result = await this.ticketModel.deleteOne(filter);
    return { deletedCount: result.deletedCount ?? 0 };
  }
}
