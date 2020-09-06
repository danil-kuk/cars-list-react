import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

interface Props<T> {
  /**
   * Item for actions.
   */
  item: T;

  /**
   * Action to perform on item delete.
   */
  onItemDelete?: (item: T) => void;

  /**
   * Action to perform on item edit.
   */
  onItemEdit?: (item: T) => void;
}

/**
 * Action buttons cell component.
 */
const ActionButtons = <T extends { id: string }>(props: Props<T>) => {
  const { item, onItemDelete, onItemEdit } = props;

  const editButton = onItemEdit && (
    <IconButton onClick={() => onItemEdit(item)}>
      <Edit fontSize="small" />
    </IconButton>
  );

  const deleteButton = onItemDelete && (
    <IconButton onClick={() => onItemDelete(item)}>
      <Delete fontSize="small" />
    </IconButton>
  );

  return (
    <TableCell>
      {editButton}
      {deleteButton}
    </TableCell>
  );
};

export default ActionButtons;
