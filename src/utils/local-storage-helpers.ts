/**
 * Get local storage item value by key.
 * @param key Item key.
 */
export function getItemFromLocalStorage(key: string): JSON | null {
  const raw = localStorage.getItem(key);
  let item = null;

  if (raw) {
    item = JSON.parse(raw);
  }
  return item;
}

/**
 * Save passed item in local storage with passed key.
 * @param key Item key.
 * @param item Item to save.
 */
export function saveItemInLocalStorage<T>(key: string, item: Record<keyof T, unknown>): void {
  const data = JSON.stringify(item);

  localStorage.setItem(key, data);
}

/**
 * Delete item from local storage by key.
 * @param key Item key.
 */
export function deleteItemInLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
