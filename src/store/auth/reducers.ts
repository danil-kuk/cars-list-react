import { getItemFromLocalStorage } from 'src/utils';
import { LocalStorageKeys } from 'src/constants';
import { User } from 'src/models';

import { LOGIN, LOGOUT } from './actions';
import { State, AuthAction } from './types';

const userInStorage = getItemFromLocalStorage(LocalStorageKeys.LOCAL_STORAGE_USER_KEY) as User | null;
const initialState: State = { user: userInStorage };

export default (state = initialState, action: AuthAction): State => {
  switch (action.type) {
    case LOGIN:
    {
      const { user } = action;

      return {
        ...state,
        user,
      };
    }

    case LOGOUT:
      return {
        ...state,
        user: null,
      };


    default:
      return state;
  }
};
