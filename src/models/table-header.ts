/**
 * Table headers.
 */
export interface TableHeader<T> {
  /**
   * Text to display in table header cell.
   */
  text: string;

  /**
   * Data key to take value from model passed to table.
   */
  dataKey: keyof T & string;

  /**
   * Is table column sortable.
   */
  isSortable?: boolean;

  /**
   * Transform value in cell.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?: (value: any) => string;
}
