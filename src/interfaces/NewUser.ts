import { User } from "./User";

export interface NewUser extends User {
  email: string;
  confirmPassword: string;
}
