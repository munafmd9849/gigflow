import type { AuthenticatedUser, UserDocument } from "../types/user.types";

export const toAuthenticatedUser = (user: UserDocument): AuthenticatedUser => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
