import { UserRole } from 'src/models';
import { enumToArray } from 'src/utils';

/**
 * Array of user role items. This array is created from UserRole enum.
 * Each item in array is an object with value and label properties.
 * @constant
 */
export const USER_ROLES = enumToArray(UserRole);
