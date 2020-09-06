import { Dispatch } from 'redux';
import { deleteItemInLocalStorage, saveItemInLocalStorage } from 'src/utils';
import { LocalStorageKeys } from 'src/constants';
import { User } from 'src/models';

import { AuthAction } from './types';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

/**
 * User login.
 * @param user User to login.
 */
export const login = (user: User) => async (dispatch: Dispatch<AuthAction>) => {
  saveItemInLocalStorage(LocalStorageKeys.LOCAL_STORAGE_USER_KEY, user);
  dispatch({
    type: LOGIN,
    user,
  });
};

/**
 * User logout.
 */
export const logout = () => (dispatch: Dispatch<AuthAction>) => {
  deleteItemInLocalStorage(LocalStorageKeys.LOCAL_STORAGE_USER_KEY);
  dispatch({
    type: LOGOUT,
    user: null,
  });
};
