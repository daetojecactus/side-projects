import { AdminStatus } from '../admin.interface';

export class AdminUpdateDto {
  password?: string;
  firstName?: string;
  lastName?: string;
  status?: AdminStatus;
}
