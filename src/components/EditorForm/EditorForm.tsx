import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  TextField,
} from '@material-ui/core';
import { EditorFormControl } from 'src/models/editor-field';
import { getValidationErrors } from 'src/utils/validation';

interface Props<T> {
  /**
   * Item to display in form.
   */
  propItem?: T | null;

  /**
   * Editor form controls.
   */
  controls: EditorFormControl<T>[];

  /**
   * Action to perform on form submit.
   */
  onSubmit: (item?: Record<keyof T & string, unknown>) => void;

  /**
   * Additional actions to perform on from reset.
   */
  onReset?: () => void;

  /**
   * Text on submit button.
   */
  submitButtonText?: string;

  /**
   * Reset form after submit.
   */
  resetAfterSubmit?: boolean;
}

const useStyles = makeStyles({
  form: {
    width: 500,
    margin: 'auto',
  },
  formInput: { marginBottom: 10 },
  formButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

/**
 * Table component.
 */
const EditorForm = <T extends Record<keyof T, unknown>>(props: Props<T>) => {
  const classes = useStyles();

  const { propItem, controls, submitButtonText, resetAfterSubmit, onSubmit, onReset } = props;

  /**
   * Item edited in form.
   */
  const [editedItem, setEditedItem] = useState<Record<string, unknown>>({});

  /**
   * Editor form controls errors.
   */
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  /**
   * Set selected item as edited. If item was undefined it creates new empty edited item.
   */
  useEffect(() => {
    setEditedItem(propItem || {});
  }, [propItem]);

  /**
   * Reset editor form.
   */
  const resetForm = () => {
    setEditedItem({});
    setErrors({});
    if (onReset) {
      onReset();
    }
  };

  /**
   * Handle editor form submit.
   * @param item Item in form.
   */
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedItem && checkValidation()) {
      return;
    }
    onSubmit(editedItem);
    if (resetAfterSubmit) {
      resetForm();
    }
  };

  /**
   * Check form validation.
   */
  const checkValidation = (): boolean => {
    const result = controls.reduce((res, control) => checkControlAndSetErrors(control) || res, false);

    return result;
  };

  /**
   * Check if control has validation errors.
   * @param control Control to check.
   */
  const checkControlAndSetErrors = (control: EditorFormControl<T>) => {
    const validationErrors = getValidationErrors(control, editedItem[control.dataKey]);

    setControlError(control, validationErrors[0]);
    return validationErrors.length > 0;
  };

  /**
   * Set error for control. If no error was passed it will reset control error.
   * @param control Control to set error for.
   * @param error Error for control.
   */
  const setControlError = (control: EditorFormControl<T>, error?: string) => {
    setErrors((prev) => ({
      ...prev,
      [control.dataKey]: error,
    }));
  };

  /**
   * Reset errors for passed control.
   * @param control Control to reset errors for.
   */
  const resetControlErrors = (control: EditorFormControl<T>) => {
    setControlError(control);
  };

  /**
   * Handle control value changes.
   * @param control Control that changed value.
   * @param value New value.
   */
  const handleChange = (control: EditorFormControl<T>, value: unknown) => {
    resetControlErrors(control);
    setEditedItem((prev) => ({
      ...prev,
      [control.dataKey]: value,
    }));
  };

  const textField = (control: EditorFormControl<T>) => (
    <TextField
      key={control.dataKey}
      error={!!errors[control.dataKey]}
      helperText={errors[control.dataKey]}
      className={classes.formInput}
      label={control.label}
      type={control.inputType}
      name={control.dataKey}
      onChange={(event) => handleChange(control, event.target.value)}
      onBlur={() => checkControlAndSetErrors(control)}
      value={editedItem[control.dataKey] === undefined ? '' : editedItem[control.dataKey]}
      fullWidth
    />
  );

  const selectField = (control: EditorFormControl<T>) => (
    <FormControl
      key={control.dataKey}
      className={classes.formInput}
      error={!!errors[control.dataKey]}
      fullWidth
    >
      <InputLabel>{control.label}</InputLabel>
      <Select
        value={editedItem[control.dataKey] === undefined ? '' : editedItem[control.dataKey]}
        onChange={(event) => handleChange(control, event.target.value)}
        onBlur={() => checkControlAndSetErrors(control)}
      >
        {control.selectItems &&
          control.selectItems.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{errors[control.dataKey]}</FormHelperText>
    </FormControl>
  );

  const inputFields = controls.map((control) => {
    if (control.inputType === 'select') {
      return selectField(control);
    }
    return textField(control);
  });

  const formActionButtons = (
    <div className={classes.formButtons}>
      <Button onClick={() => resetForm()}>Reset</Button>
      <Button
        type="submit"
        color="primary"
      >
        {submitButtonText || 'Submit'}
      </Button>
    </div>
  );

  return (
    <form
      className={classes.form}
      onSubmit={handleFormSubmit}
    >
      {inputFields}
      {formActionButtons}
    </form>
  );
};

export default EditorForm;
