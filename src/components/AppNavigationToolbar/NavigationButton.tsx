import React from 'react';
import { NavLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme, Button } from '@material-ui/core';

interface Props {
  /**
   * Redirect link.
   */
  to: string;

  /**
   * Button text.
   */
  children: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navButton: {
      margin: theme.spacing(0.4),
      '&.active': { background: theme.palette.action.selected },
    },
  }),
);

/**
 * Navigation button component.
 * @param props Button text and redirect link.
 */
const NavigationButton: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Button
      size="medium"
      color="inherit"
      component={NavLink}
      to={props.to}
      className={classes.navButton}
      exact
    >
      {props.children}
    </Button>
  );
};

export default NavigationButton;
