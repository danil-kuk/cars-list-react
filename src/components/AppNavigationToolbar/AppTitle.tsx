import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: theme.palette.common.white,
    },
  }),
);

/**
 * App title with redirect link.
 */
const AppTitle: React.FC = () => {
  const classes = useStyles();

  return (
    <Typography
      variant="h5"
      component={NavLink}
      to="/"
      className={classes.title}
    >
      Cars list
    </Typography>
  );
};

export default AppTitle;
