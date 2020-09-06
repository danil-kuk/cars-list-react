import { SortOrder } from 'src/types';

/**
 * Calculate sort order and property to sort by depending on current sort order and property.
 * @param order Current sorting order.
 * @param property Current property to sort by.
 * @param nextProperty Next property to sort by.
 */
export function calculateSortParams<T extends { id: string }>(
  order: SortOrder,
  property: keyof T,
  nextProperty: keyof T,
) {
  let newOrder = order;
  let newProperty = property;

  if (property === nextProperty && order === 'asc') {
    newOrder = 'desc';
  } else if (property === nextProperty && order === 'desc') {
    newOrder = 'asc';
    newProperty = 'id';
  } else {
    newOrder = 'asc';
    newProperty = nextProperty;
  }
  return {
    order: newOrder,
    property: newProperty,
  };
}
