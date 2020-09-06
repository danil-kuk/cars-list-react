import { EMAIL_PATTERN } from 'src/constants';

/** Check if input isn't empty.
 * @param value Value to check
 */
function required(value: string | undefined): false | string {
  return (value === undefined || value === '') && 'Field is required';
}

/** Check if value is match email regex pattern.
 * @param value Value to check
 */
function email(value: string): false | string {
  return !EMAIL_PATTERN.test(value) && 'Invalid email';
}

/** Check if value is non negative (i.e. equal or grater 0).
 * @param value Value to check
 */
function nonNegative(value: number): false | string {
  return value < 0 && 'Value must be non negative';
}

/** Check if input value is in passed interval (i.e. [start, end] must include value).
 * @param start Start of interval.
 * @param end End of interval.
 */
function between(start: number, end: number): (value: number) => false | string {
  return (value: number) => (value < start || value > end) && `Field must be between ${start} and ${end}`;
}

export default {
  required,
  email,
  between,
  nonNegative,
};
