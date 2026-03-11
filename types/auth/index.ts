import { User } from "../user";

/* LOGIN */
export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface GetMeResponse extends User {}
