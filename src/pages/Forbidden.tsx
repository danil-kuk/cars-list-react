import React from 'react';
import { Button, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

/**
 * Page with route access forbidden message.
 */
const ForbiddenPage: React.FC = () => (
  <>
    <h2>Looks like you don&apos;t have permisson to access this route :( </h2>
    <Box
      display="flex"
      justifyContent="center"
      marginTop={2}
    >
      <Button
        size="medium"
        color="inherit"
        component={NavLink}
        to={'/'}
      >
        Return to Homepage
      </Button>
    </Box>
  </>
);

export default ForbiddenPage;
