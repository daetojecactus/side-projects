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
import { AdminService } from './admin.service';
import { Admin } from './admin.schema';
import { CreateAdminDto } from './dto/admin-create.dto';
import { UpdateAdminDto } from './dto/admin-update.dto';
import { JwtCorpAuthGuard } from '../auth-corp/jwt-corp-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async find(@Query() query: Partial<Admin>) {
    return this.adminService.find(query);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.adminService.findOne({ id });
  }

  @UseGuards(JwtCorpAuthGuard)
  @Post()
  async create(@Body() dto: CreateAdminDto) {
    return this.adminService.create(dto);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    return this.adminService.updateOne({ id }, dto);
  }

  @UseGuards(JwtCorpAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    await this.adminService.deleteOne({ id });
    return;
  }
}
