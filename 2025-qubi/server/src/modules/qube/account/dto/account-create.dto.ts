export class CreateAccountDto {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  telegram?: string;
}
