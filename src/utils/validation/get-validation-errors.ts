import { EditorFormControl } from 'src/models/editor-field';

/**
 * Check if passed value is valid inside control.
 * @param control Control to validate value for.
 * @param value Value to check.
 */
export function getValidationErrors<T>(control: EditorFormControl<T>, value: unknown) {
  const result = control.validators?.reduce((errors: string[], validator) => {
    const validationError = validator(value);

    if (validationError) {
      errors.push(validationError);
    }
    return errors;
  }, []);

  return result || [];
}
