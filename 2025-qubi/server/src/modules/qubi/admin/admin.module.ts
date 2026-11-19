import { Module } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    CryptoModule,
  ],
  providers: [AdminRepository, AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
