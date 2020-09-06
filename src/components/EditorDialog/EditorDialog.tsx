import React from 'react';
import { Dialog, DialogContent, DialogTitle, createStyles, Theme, makeStyles, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { EditorFormControl } from 'src/models/editor-field';

import { EditorForm } from '../EditorForm';

interface Props<T> {
  /**
   * Is dialog window open.
   */
  open: boolean;

  /**
   * Item to display in form.
   */
  propItem?: T | null;

  /**
   * Editor form controls.
   */
  controls: EditorFormControl<T>[];

  /**
   * Action to perform on form close.
   */
  onClose: (item?: Record<keyof T & string, unknown>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: { width: 500 },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }),
);

/**
 * Table component.
 */
const EditorDialog = <T extends Record<keyof T, unknown>>(props: Props<T>) => {
  const classes = useStyles();

  const { open, propItem, controls, onClose } = props;

  /**
   * Dialog title
   */
  const dialogTitle = propItem ? 'Edit item' : 'New item';

  const closeButton = (
    <IconButton
      className={classes.closeButton}
      onClick={() => onClose()}
    >
      <Close />
    </IconButton>
  );

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>
        {dialogTitle}
        {closeButton}
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <EditorForm
          propItem={propItem}
          onSubmit={onClose}
          controls={controls}
          submitButtonText={'Save'}
          resetAfterSubmit
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditorDialog;
