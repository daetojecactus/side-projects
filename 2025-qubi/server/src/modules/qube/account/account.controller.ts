import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.schema';
import { CreateAccountDto } from './dto/account-create.dto';
import { UpdateAccountDto } from './dto/account-update.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async find(@Query() query: Partial<Account>) {
    return this.accountService.find(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.accountService.findOne({ id });
  }

  @Post()
  async create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() dto: UpdateAccountDto) {
    return this.accountService.updateOne({ id }, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    await this.accountService.deleteOne({ id });
    return;
  }
}
