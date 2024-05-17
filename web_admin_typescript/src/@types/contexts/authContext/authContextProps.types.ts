import { User } from "../../user.types";

export type AuthContextProps = {
  user: User;
  setUser: (user: User | any) => void;
};
