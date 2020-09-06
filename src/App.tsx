import React from 'react';
// eslint-disable-next-line @typescript-eslint/camelcase
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import { AppRouter } from './components/AppRouter';
import { store } from './store';

const theme = unstable_createMuiStrictModeTheme();

/**
 * App component.
 */
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}
