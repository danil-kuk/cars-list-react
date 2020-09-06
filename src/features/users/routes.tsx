import React from 'react';
import { AppRoute } from 'src/routes';
import { adminProtectedRoute } from 'src/utils';

const UsersPage = React.lazy(() => import('./pages/UsersPage'));

/**
 * Users page router.
 */
const routes: AppRoute[] = [
  {
    path: '/users',
    exact: true,
    component: UsersPage,
    canActivate: adminProtectedRoute,
  },
];

export default routes;
