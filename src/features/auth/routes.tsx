import React from 'react';
import { AppRoute } from 'src/routes';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));

/**
 * Login list page router.
 */
const routes: AppRoute[] = [
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
];

export default routes;
