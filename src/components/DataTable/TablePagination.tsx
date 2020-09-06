import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      justifyContent: 'center',
      margin: theme.spacing(0.6),
    },
  }),
);

interface Props {
  /**
   * Pagination pages count.
   */
  pagesCount: number;

  /**
   * Callback for seleted page changes.
   */
  onPageChange: (page: number) => void;
}

/**
 * Table pagination.
 */
const TablePagination: React.FC<Props> = (props) => {
  const classes = useStyles();

  /**
   * Handle pagination page changes.
   * @param newPage New selected page.
   */
  const handleChangePage = (_: unknown, newPage: number) => {
    props.onPageChange(newPage);
  };

  return (
    <Pagination
      classes={{ ul: classes.pagination }}
      count={props.pagesCount}
      onChange={handleChangePage}
    />
  );
};

export default TablePagination;
