import { AccountStatus } from '../account.interface';

export class UpdateAccountDto {
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  status?: AccountStatus;
}
