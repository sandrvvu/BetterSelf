export type User = {
    id: string;
    name: string;
    email: string;
  };

export type UpdateUserDto = {
  name?: string;
  password?: string;
}