import { UserRole, User } from "src/models";

/**
 * Check if passed user is admin.
 * @param user User to check.
 */
export function isUserAdmin(user: User | null): boolean {
  return !!user && user.role === UserRole.Admin;
}
