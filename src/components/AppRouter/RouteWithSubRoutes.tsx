import React, { useMemo } from 'react';
import { Route, Redirect } from 'react-router';
import { AppRoute } from 'src/routes';

/**
 * Component for route with sub-routes.
 * @param route App route
 */
export default function RouteWithSubRoutes(route: AppRoute) {
  const Component = route.component;

  /**
   * Check if route can be activated.
   */
  const canBeActivated = useMemo(() => (route.canActivate === undefined ? true : route.canActivate()), [route]);

  if (canBeActivated === true) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={(props) => <Component
          {...props}
          routes={route.routes}
        />}
      />
    );
  } else if (canBeActivated === false) {
    return <Redirect to={'/forbidden'} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: canBeActivated,
          state: { redirect: route.path },
        }}
      />
    );
  }
}
