import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtPublicAuthGuard } from '../auth-public/jwt-public-auth.guard';
import { JwtCorpAuthGuard } from '../auth-corp/jwt-corp-auth.guard';
import { Transaction } from './transaction.schema';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Get('my')
  async myTransactions(@Req() req) {
    return this.transactionService.findByAccount(req.user.id);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Get()
  async find(@Query() query: Partial<Transaction>) {
    return this.transactionService.find(query);
  }
}
