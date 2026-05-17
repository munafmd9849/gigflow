export const userRoles = ["Admin", "Sales"] as const;

export type UserRole = (typeof userRoles)[number];

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthenticatedUser;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  role: UserRole;
}
