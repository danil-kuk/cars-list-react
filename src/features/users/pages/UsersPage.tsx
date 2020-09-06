import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { SortOrder } from 'src/types';
import { DataTable } from 'src/components/DataTable';
import { EditorDialog } from 'src/components/EditorDialog';
import { User } from 'src/models';
import { userService } from 'src/services/api';
import { RootState } from 'src/store';
import { logout, login } from 'src/store/auth/actions';

import { headers } from '../utils/headers';
import { formControls } from '../utils/controls';

interface Props {
  /**
   * Current user.
   */
  user: User | null;

  /**
   * User logout.
   */
  logout: () => (dispatch: Dispatch) => void;

  /**
   * User login.
   */
  login: (user: User) => (dispatch: Dispatch) => void;
}

/**
 * Users page.
 */
const UsersPage: React.FC<Props> = (props) => {
  const { user, logout, login } = props;

  const history = useHistory();

  /**
   * Users data.
   */
  const [usersData, setUsersData] = useState<User[]>([]);

  /**
   * User editor dialog state.
   */
  const [open, setOpen] = useState(false);

  /**
   * User selected for edit.
   */
  const [editedUser, setEditedUser] = useState<User | null>();

  /**
   * Data sort order.
   */
  const [order, setOrder] = useState<SortOrder>('asc');

  /**
   * Field to order data by.
   */
  const [orderBy, setOrderBy] = useState<keyof User>('id');

  /**
   * Get users data from database to display in table.
   */
  useEffect(() => userService.getAllUsers(setUsersData, orderBy, order), [order, orderBy]);

  /**
   * Handle sort order and field changes.
   * @param order Sort order.
   * @param field Field to sort by.
   */
  const handleSortChange = (order: SortOrder, field: keyof User) => {
    setOrder(order);
    setOrderBy(field);
  };

  /**
   * Handle user edit action.
   * @param item User to edit.
   */
  const handleItemEdit = (item: User) => {
    setOpen(true);
    setEditedUser(item);
  };

  /**
   * Actions to do when user was edited.
   * @param editedUser Edited user.
   */
  const handleUserEdit = (editedUser: User) => {
    userService.saveUserToDatabase(editedUser);
    if (editedUser.id === user?.id) {
      login(editedUser);
    }
  };

  /**
   * Handle editor form close.
   * @param editedItem Item in editor form
   */
  const handleClose = (editedItem?: Record<keyof User, unknown>) => {
    if (editedItem) {
      handleUserEdit(editedItem as User);
    }
    setOpen(false);
    setEditedUser(null);
  };

  /**
   * Handle user delete action.
   * @param item User to delete.
   */
  const handleDelete = (item: User) => {
    userService.delteUserFromDatabase(item);
    if (user && item.id === user.id) {
      logout();
      history.push('/');
    }
  };

  return (
    <>
      <h1>Users page</h1>
      <h3>Hello, {user?.name}</h3>
      <DataTable
        data={usersData}
        headers={headers}
        onItemEdit={handleItemEdit}
        onItemDelete={handleDelete}
        onSortChange={handleSortChange}
      />
      <EditorDialog
        open={open}
        propItem={editedUser}
        controls={formControls}
        onClose={handleClose}
      />
      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
      >
        <Button onClick={() => setOpen(true)}>Add new</Button>
      </Box>
    </>
  );
};

const mapStateToProps = ({ auth }: RootState) => ({ user: auth.user });

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      logout,
      login,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
