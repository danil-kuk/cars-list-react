import { EnumItem } from './enum-helpers';

export interface EditorFormControl<T> {
  label: string;

  dataKey: keyof T & string;

  inputType: string;

  selectItems?: EnumItem[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validators?: ((value: any) => false | string)[];
}
