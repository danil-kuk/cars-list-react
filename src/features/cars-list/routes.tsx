import React from 'react';
import { AppRoute } from 'src/routes';

const CarsListPage = React.lazy(() => import('./pages/CarsListPage'));

/**
 * Cars list page router.
 */
const routes: AppRoute[] = [
  {
    path: '/cars',
    exact: true,
    component: CarsListPage,
  },
];

export default routes;
