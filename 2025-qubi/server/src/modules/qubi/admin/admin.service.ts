import { Injectable } from '@nestjs/common';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { CryptoService } from '../crypto/crypto.service';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin.schema';
import { AdminCreateDto } from './dto/admin-create.dto';
import { AdminStatus } from './admin.interface';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async findOne(filter: Partial<Admin> & { _id?: string }) {
    return this.adminRepository.findOne(filter);
  }

  async find(filter?: Partial<Admin>) {
    return this.adminRepository.find(filter);
  }

  async create(dto: AdminCreateDto) {
    dto.password = await this.cryptoService.hashPassword(dto.password);

    return this.adminRepository.create(dto);
  }

  async updateOne(
    filter: Partial<Admin> & { _id?: string },
    partialAdmin: Partial<OmitTimestamps<Admin>>,
  ) {
    return this.adminRepository.updateOne(filter, partialAdmin);
  }

  async deleteOne(
    filter: Partial<Admin> & { _id?: string },
  ): Promise<{ deletedCount: number }> {
    return this.adminRepository.deleteOne(filter);
  }
}
