import { User } from "@/lib/types/user";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};
