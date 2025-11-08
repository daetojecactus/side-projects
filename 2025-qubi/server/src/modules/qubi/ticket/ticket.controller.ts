import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtPublicAuthGuard } from '../auth-public/jwt-public-auth.guard';
import { JwtCorpAuthGuard } from '../auth-corp/jwt-corp-auth.guard';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.schema';
import { TicketCreateDto } from './dto/ticket-create.dto';
import { TicketCreateCorpDto } from './dto/ticket-create-corp.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Get('my')
  async myTickets(@Req() req) {
    return this.ticketService.findByAccount(req.user.id);
  }

  @UseGuards(JwtPublicAuthGuard)
  @Post()
  async createPublic(@Body() dto: TicketCreateDto, @Req() req) {
    return this.ticketService.createPublic(dto, req.user.id);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Patch(':id')
  async updateOnePublic(
    @Param('id') id: number,
    @Body() partialTicket: Partial<Ticket>,
  ) {
    return this.ticketService.updateOne({ id }, partialTicket);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Post('corp')
  async createCorp(@Body() dto: TicketCreateCorpDto, @Req() req) {
    return this.ticketService.createCorp(dto, req.user.id);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Get('corp')
  async find(@Query() query: Partial<Ticket>) {
    return this.ticketService.find(query);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Get('corp/:id')
  async findOne(@Param('id') id: number) {
    return this.ticketService.findOne({ id });
  }

  @UseGuards(JwtCorpAuthGuard)
  @Patch('corp/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() partialTicket: Partial<Ticket>,
    @Req() req,
  ) {
    const ticket = { ...partialTicket, adminId: req.user.id };
    return this.ticketService.updateOne({ id }, ticket);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Delete('corp/:id')
  async deleteOne(@Param('id') id: number) {
    return this.ticketService.deleteOne({ id });
  }
}
