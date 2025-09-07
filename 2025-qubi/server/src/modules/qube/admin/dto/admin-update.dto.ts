import { AdminStatus } from '../admin.interface';

export class UpdateAdminDto {
  password?: string;
  firstName?: string;
  lastName?: string;
  status?: AdminStatus;
}
