import { TableHeader, Car, CarBodyType } from 'src/models';
import { parseEnum, dateToString } from 'src/utils';

/**
 * Cars list table headers.
 */
export const headers: TableHeader<Car>[] = [
  {
    text: 'Producer',
    dataKey: 'producer',
    isSortable: true,
  },
  {
    text: 'Model',
    dataKey: 'model',
    isSortable: true,
  },
  {
    text: 'Body type',
    dataKey: 'bodyType',
    isSortable: true,
    transform: (value: number) => parseEnum(value, CarBodyType),
  },
  {
    text: 'Year',
    dataKey: 'year',
    isSortable: true,
  },
  {
    text: 'Mileage',
    dataKey: 'mileage',
    isSortable: true,
  },
  {
    text: 'Description',
    dataKey: 'description',
    isSortable: true,
  },
  {
    text: 'Created',
    dataKey: 'created',
    isSortable: true,
    transform: (value: Date) => dateToString(value),
  },
  {
    text: 'Updated',
    dataKey: 'updated',
    isSortable: true,
    transform: (value: Date) => dateToString(value),
  },
];
