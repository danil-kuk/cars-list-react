import React from 'react';
import { connect } from 'react-redux';
import { Toolbar, AppBar } from '@material-ui/core';
import { RootState } from 'src/store';
import { User } from 'src/models';
import { isUserAdmin } from 'src/utils';

import NavigationButton from './NavigationButton';
import AppTitle from './AppTitle';
import AuthButtons from './AuthButtons';

interface Props {
  /**
   * Current user.
   */
  user: User | null;
}

/**
 * App navigation toolbar.
 */
const AppNavigationToolbar: React.FC<Props> = (props) => {
  const { user } = props;

  const adminRoutes = isUserAdmin(user) && (
    <>
      <NavigationButton to="/users">Users</NavigationButton>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <AppTitle />
        <NavigationButton to="/">Home</NavigationButton>
        <NavigationButton to="/cars">Cars</NavigationButton>
        {adminRoutes}
        <AuthButtons />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ auth }: RootState) => ({ user: auth.user });

export default connect(mapStateToProps)(AppNavigationToolbar);
