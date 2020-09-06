import { EditorFormControl } from 'src/models/editor-field';
import { Validators } from 'src/utils/validation';
import { USER_ROLES } from 'src/constants';
import { User } from 'src/models';

/**
 * User editor form controls.
 */
export const formControls: EditorFormControl<User>[] = [
  {
    label: 'Name',
    dataKey: 'name',
    inputType: 'text',
    validators: [Validators.required],
  },
  {
    label: 'Email',
    dataKey: 'email',
    inputType: 'email',
    validators: [Validators.required, Validators.email],
  },
  {
    label: 'User role',
    dataKey: 'role',
    inputType: 'select',
    selectItems: USER_ROLES,
    validators: [Validators.required],
  },
  {
    label: 'Password',
    dataKey: 'password',
    inputType: 'password',
    validators: [Validators.required],
  },
];
