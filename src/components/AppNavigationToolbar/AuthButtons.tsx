import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { RootState } from 'src/store';
import { User } from 'src/models';
import { logout } from 'src/store/auth/actions';

import NavigationButton from './NavigationButton';

interface Props {
  /**
   * Current user.
   */
  user: User | null;

  /**
   * Logout user.
   */
  logout: () => (dispatch: Dispatch) => void;
}

/**
 * Auth buttons.
 */
const AuthButtons: React.FC<Props> = (props) => {
  const { user, logout } = props;
  const history = useHistory();

  /**
   * Handle user logout.
   */
  const handleLogout = (): void => {
    logout();
    history.push('/');
  };

  return !user ? (
    <NavigationButton to="/login">Login</NavigationButton>
  ) : (
    <IconButton onClick={() => handleLogout()}>
      <ExitToApp />
    </IconButton>
  );
};

const mapStateToProps = ({ auth }: RootState) => ({ user: auth.user });

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtons);
