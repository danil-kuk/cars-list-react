import { store } from "src/store";

import { isUserAdmin } from "./is-user-admin";

/**
 * Check if user is admin and redirect him to login page if unauthorized.
 */
export function adminProtectedRoute(): boolean | string {
  const { user } = store.getState().auth;

  return isUserAdmin(user) || (!user && '/login');
}
