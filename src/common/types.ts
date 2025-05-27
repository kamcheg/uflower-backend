import { Role } from '../modules/auth/role.enum';

export interface UserPayload {
  sub: number;
  phone: string;
  brand: number;
  roles: Role[];
}

export interface IWorkTime {
  from: string;
  to: string;
  isAlwaysOpened: boolean;
}
