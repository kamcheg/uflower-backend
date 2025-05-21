export interface UserPayload {
  sub: number;
  phone: string;
  brand: number;
}

export interface IWorkTime {
  from: string;
  to: string;
  isAlwaysOpened: boolean;
}
