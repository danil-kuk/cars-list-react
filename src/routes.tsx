import React from 'react';

import CarsRoutes from './features/cars-list/routes';
import UsersRoutes from './features/users/routes';
import AuthRoutes from './features/auth/routes';

const HomePage = React.lazy(() => import('./pages/Home'));
const ForbiddenPage = React.lazy(() => import('./pages/Forbidden'));

/**
 * App route.
 */
export interface AppRoute {
  /**
   * Route path.
   */
  path: string;

  /**
   * Route component.
   */
  component: React.ReactType;

  /**
   * Is exact route.
   */
  exact?: boolean;

  /**
   * Child routes.
   */
  routes?: AppRoute[];

  /**
   * Can user activate route.
   */
  canActivate?: () => boolean | string;
}

/**
 * App routes
 */
const routes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/forbidden',
    exact: true,
    component: ForbiddenPage,
  },
  ...CarsRoutes,
  ...UsersRoutes,
  ...AuthRoutes,
];

export default routes;
