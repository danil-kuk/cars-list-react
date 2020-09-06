/**
 * Check if passed item has keyword in its values.
 * @param item Content to check.
 * @param value Value.
 */
export function itemHasValue(item: Record<string, unknown>, value: string): boolean {
  return Object.keys(item).some((key) => {
    const field = String(item[key]);

    return field.toLowerCase().includes(value.toLowerCase());
  });
}
