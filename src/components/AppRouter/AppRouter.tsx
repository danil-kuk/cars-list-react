import React, { Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from 'src/routes';
import { AppNavigationToolbar } from 'src/components/AppNavigationToolbar';
import RouteWithSubRoutes from 'src/components/AppRouter/RouteWithSubRoutes';


/**
 * App component.
 */
export default function AppRouter() {
  const routesArr = routes.map((route, i) => <RouteWithSubRoutes
    key={i}
    {...route}
  />);

  return (
    <BrowserRouter>
      <AppNavigationToolbar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>{routesArr}</Switch>
      </Suspense>
    </BrowserRouter>
  );
}
