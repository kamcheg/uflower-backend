export interface UserPayload {
  sub: number;
  email: string;
  brand: number;
}

export interface IWorkTime {
  from: string;
  to: string;
  isAlwaysOpened: boolean;
}
