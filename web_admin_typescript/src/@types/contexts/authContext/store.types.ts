import { User } from "../../user.types";

export type Store = {
  user: User | any | null;
  isLoggedIn: boolean;
};
