import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { Operation } from './operation.schema';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { JwtCorpAuthGuard } from '../auth-corp/jwt-corp-auth.guard';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @UseGuards(JwtCorpAuthGuard)
  @Post()
  async create(@Body() dto: CreateOperationDto) {
    return this.operationService.create(dto);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Get()
  async find(@Query() query: Partial<Operation>) {
    return this.operationService.find(query);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Get(':code')
  async findOne(@Param('code') code: string) {
    return this.operationService.findOne({ code });
  }

  @UseGuards(JwtCorpAuthGuard)
  @Put(':code')
  async update(@Param('code') code: string, @Body() dto: UpdateOperationDto) {
    return this.operationService.updateOne({ code }, dto);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Delete(':code')
  async delete(@Param('code') code: string) {
    await this.operationService.deleteOne({ code });
    return;
  }
}
