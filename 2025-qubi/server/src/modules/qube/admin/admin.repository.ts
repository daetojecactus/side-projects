import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { Admin, AdminDocument } from './admin.schema';
import { AdminMessages } from './constants/admin-messages';
import { CreateAdminDto } from './dto/admin-create.dto';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async findOne(filter: Partial<Admin> & { _id?: string }) {
    return await this.adminModel.findOne(filter);
  }

  async find(filter?: Partial<Admin>) {
    return await this.adminModel.find(filter ?? {});
  }

  async create(admin: CreateAdminDto) {
    return await this.adminModel.create(admin);
  }

  async updateOne(
    filter: Partial<Admin> & { _id?: string },
    partialAdmin: Partial<OmitTimestamps<Admin>>,
  ) {
    const admin = await this.adminModel.findOneAndUpdate(filter, partialAdmin, {
      new: true,
    });
    if (!admin) {
      throw new NotFoundException(AdminMessages.ADMIN_NOT_FOUND);
    }
    return admin;
  }

  async deleteOne(
    filter: Partial<Admin> & { _id?: string },
  ): Promise<{ deletedCount: number }> {
    const result = await this.adminModel.deleteOne(filter);
    return { deletedCount: result.deletedCount ?? 0 };
  }
}
