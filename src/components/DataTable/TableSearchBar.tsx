import React, { ChangeEvent, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(0.8),
    },
    search: {
      maxWidth: 240,
      width: '100%',
    },
  }),
);

interface Props {
  /**
   * Callback for searchbar keyword changes.
   */
  onKeywordChange: (keyword: string) => void;
}

/**
 * Table search bar.
 */
const TableSearchBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { onKeywordChange } = props;

  /**
   * Searchbar value.
   */
  const [keyword, setKeyword] = useState('');

  /**
   * Handle searchbar keyword changes.
   * @param event Input changed event.
   */
  const handleKeywordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target;

    setKeyword(value);
    onKeywordChange(value);
  };

  return (
    <div className={classes.container}>
      <TextField
        className={classes.search}
        label="Search field"
        type="search"
        value={keyword}
        onChange={handleKeywordChange}
      />
    </div>
  );
};

export default TableSearchBar;
