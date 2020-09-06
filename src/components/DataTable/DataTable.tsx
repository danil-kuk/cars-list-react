import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { itemHasValue } from 'src/utils';
import { SortOrder } from 'src/types';
import { calculateSortParams } from 'src/utils/calculate-sort-params';
import { TableHeader } from 'src/models';

import TablePagination from './TablePagination';
import TableSearchBar from './TableSearchBar';
import ActionButtons from './ActionButtons';

const useStyles = makeStyles({
  table: {
    maxWidth: 1200,
    margin: 'auto',
    '& td': {
      maxWidth: 100,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

interface Props<T> {
  /**
   * Rows per page.
   */
  rowsPerPage: number;

  /**
   * Data to display in table.
   */
  data: T[];

  /**
   * Table headers.
   */
  headers: TableHeader<T>[];

  /**
   * Action to perform on item delete.
   */
  onItemDelete?: (item: T) => void;

  /**
   * Action to perform on item edit.
   */
  onItemEdit?: (item: T) => void;

  /**
   * Action to perform when sort order or field is changed.
   */
  onSortChange?: (order: SortOrder, field: keyof T) => void;
}

/**
 * Table component.
 */
const DataTable = <T extends { id: string }>(props: Props<T>) => {
  const classes = useStyles();

  const { data, rowsPerPage, headers, onItemDelete, onItemEdit, onSortChange } = props;

  /**
   * Data sort order.
   */
  const [order, setOrder] = useState<SortOrder>('asc');

  /**
   * Field to order data by.
   */
  const [orderBy, setOrderBy] = useState<keyof T>('id');

  /**
   * Current page.
   */
  const [page, setPage] = useState(1);

  /**
   * Search keyword to filter data.
   */
  const [keyword, setKeyword] = useState('');

  /**
   * Handle sort params changes.
   * @param property Property to order by.
   */
  const handleSortChange = (_event: React.MouseEvent<unknown>, property: keyof T) => {
    const { order: nextOrder, property: nextOrderBy } = calculateSortParams(order, orderBy, property);

    setOrder(nextOrder);
    setOrderBy(nextOrderBy);
    if (onSortChange) {
      onSortChange(nextOrder, nextOrderBy);
    }
  };

  const tableHeadRow = (
    <TableRow>
      {headers.map((header) => (
        <TableCell key={header.dataKey}>
          {onSortChange && header.isSortable ? (
            <TableSortLabel
              active={orderBy === header.dataKey}
              direction={orderBy === header.dataKey ? order : 'asc'}
              onClick={(event) => handleSortChange(event, header.dataKey)}
            >
              {header.text}
            </TableSortLabel>
          ) : (
            header.text
          )}
        </TableCell>
      ))}
      {onItemDelete && onItemEdit && <TableCell>Actions</TableCell>}
    </TableRow>
  );

  /**
   * Filtered data after search.
   */
  const filteredData = useMemo(() => data.filter((item) => itemHasValue(item, keyword)), [data, keyword]);

  /**
   * Pagination slice start index.
   */
  const sliceStart = useMemo(() => (page - 1) * rowsPerPage, [page, rowsPerPage]);

  /**
   * Pagination slice end index.
   */
  const sliceEnd = useMemo(() => sliceStart + rowsPerPage, [rowsPerPage, sliceStart]);

  const dataRows = filteredData.slice(sliceStart, sliceEnd).map((item) => (
    <TableRow key={item.id}>
      {headers.map((header) => {
        const value = !header.transform ? String(item[header.dataKey]) : header.transform(item[header.dataKey]);

        return (
          <TableCell
            key={header.dataKey}
            title={value}
          >
            {value}
          </TableCell>
        );
      })}
      {onItemDelete && onItemEdit && <ActionButtons
        item={item}
        onItemDelete={onItemDelete}
        onItemEdit={onItemEdit}
      />}
    </TableRow>
  ));

  /**
   * Pagination pages count.
   */
  const pagesCount = useMemo(() => Math.ceil(filteredData.length / rowsPerPage), [filteredData.length, rowsPerPage]);

  return (
    <TableContainer
      className={classes.table}
      component={Paper}
      elevation={3}
    >
      <TableSearchBar onKeywordChange={setKeyword} />
      <Table>
        <TableHead>{tableHeadRow}</TableHead>
        <TableBody>{dataRows}</TableBody>
      </Table>
      <TablePagination
        pagesCount={pagesCount}
        onPageChange={setPage}
      />
    </TableContainer>
  );
};

DataTable.defaultProps = { rowsPerPage: 5 };

export default DataTable;
