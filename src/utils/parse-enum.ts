import { EnumLikeObject } from 'src/models';

/**
 * Get Enum item label from passed value.
 * @param value Value to parse.
 * @param enumToParse Enum object to get labels from.
 */
export function parseEnum(value: number, enumToParse: EnumLikeObject): string {
  return enumToParse[value];
}
