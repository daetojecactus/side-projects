import { AccountStatus } from '../account.interface';

export class AccountUpdateDto {
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  status?: AccountStatus;
}
