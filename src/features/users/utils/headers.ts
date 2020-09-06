import { TableHeader, User, UserRole } from 'src/models';
import { parseEnum } from 'src/utils';

/**
 * Users table headers.
 */
export const headers: TableHeader<User>[] = [
  {
    text: 'Name',
    dataKey: 'name',
    isSortable: true,
  },
  {
    text: 'User role',
    dataKey: 'role',
    isSortable: true,
    transform: (value: number) => parseEnum(value, UserRole),
  },
  {
    text: 'Email',
    dataKey: 'email',
    isSortable: true,
  },
];
