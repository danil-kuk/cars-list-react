import { User } from "src/models";

/**
 * Auth sate.
 */
export interface State {
  user: User | null;
}

/**
 * Auth action.
 */
export interface AuthAction {
  type: string;
  user: User | null;
}
