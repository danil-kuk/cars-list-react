import { EnumItem, EnumLikeObject } from 'src/models';

/**
 * Transforms number to Array of Enum with label.
 * @param sourceArray Value to parse.
 */
export function enumToArray<T extends EnumLikeObject>(sourceArray: T): EnumItem[] {
  const array = Object.values(sourceArray)
    .filter((key) => !isNaN(+key))
    .map((key) => ({
      value: +key,
      label: String(sourceArray[+key]),
    }));

  return array;
}
