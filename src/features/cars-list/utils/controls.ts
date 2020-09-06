import { EditorFormControl } from 'src/models/editor-field';
import { Validators } from 'src/utils/validation';
import carDefaults from 'src/constants/car-defaults';
import { CAR_BODY_TYPES } from 'src/constants';
import { Car } from 'src/models';

/**
 * Car editor form controls.
 */
export const formControls: EditorFormControl<Car>[] = [
  {
    label: 'Producer',
    dataKey: 'producer',
    inputType: 'text',
    validators: [Validators.required],
  },
  {
    label: 'Model',
    dataKey: 'model',
    inputType: 'text',
    validators: [Validators.required],
  },
  {
    label: 'Body type',
    dataKey: 'bodyType',
    inputType: 'select',
    selectItems: CAR_BODY_TYPES,
    validators: [Validators.required],
  },
  {
    label: 'Year',
    dataKey: 'year',
    inputType: 'number',
    validators: [Validators.required, Validators.between(carDefaults.MIN_YEAR, carDefaults.MAX_YEAR)],
  },
  {
    label: 'Mileage',
    dataKey: 'mileage',
    inputType: 'number',
    validators: [Validators.required, Validators.nonNegative],
  },
  {
    label: 'Description',
    dataKey: 'description',
    inputType: 'text',
    validators: [Validators.required],
  },
];
