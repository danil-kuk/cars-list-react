import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { login } from 'src/store/auth/actions';
import { AuthAction } from 'src/store/auth/types';
import { RootState } from 'src/store';
import { User, UserLogin } from 'src/models';
import { Validators } from 'src/utils/validation';
import { EditorFormControl } from 'src/models/editor-field';
import { EditorForm } from 'src/components/EditorForm';
import { userService } from 'src/services/api';

/**
 * Login form controls.
 */
export const formControls: EditorFormControl<UserLogin>[] = [
  {
    label: 'Email',
    dataKey: 'email',
    inputType: 'text',
    validators: [Validators.required, Validators.email],
  },
  {
    label: 'Password',
    dataKey: 'password',
    inputType: 'password',
    validators: [Validators.required],
  },
];

interface Props {
  /**
   * Current user.
   */
  user: User | null;

  /**
   * Action to perform on user login.
   */
  login: (user: User) => (dispatch: Dispatch<AuthAction>) => void;
}

/**
 * Login page.
 */
const LoginPage: React.FC<Props> = (props) => {
  const { user, login } = props;

  /**
   * Router location.
   */
  const location = useLocation<{ redirect: string }>();

  /**
   * Path to redirect user to after login.
   */
  const redirectPath = location.state?.redirect;

  /**
   * Show user auth error.
   */
  const [showError, setShowError] = useState(false);

  /**
   * Check if user is logged in. Show error if invalid email or password.
   * @param user User to check.
   */
  const checkUserOrShowError = (user: User | null) => {
    if (user) {
      login(user);
    } else {
      setShowError(true);
    }
  };

  /**
   * Handle form submit.
   * @param editedItem Item in editor form.
   */
  const handleSubmit = async (editedItem?: Record<keyof UserLogin, unknown>) => {
    setShowError(false);
    if (editedItem) {
      const user = await userService.login(String(editedItem.email), String(editedItem.password));

      checkUserOrShowError(user);
    }
  };

  const loginError = showError && (
    <Typography
      color="error"
      variant="body1"
      align="center"
    >
      Invalid login or password!
    </Typography>
  );

  const redirect = user && <Redirect to={redirectPath || '/'} />;

  return (
    <>
      <h1>Login page</h1>
      <EditorForm
        controls={formControls}
        onSubmit={handleSubmit}
        submitButtonText={'Login'}
        onReset={() => setShowError(false)}
      />
      {loginError}
      {redirect}
    </>
  );
};

const mapStateToProps = ({ auth }: RootState) => ({ user: auth.user });

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ login }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
