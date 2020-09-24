import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';
import theme from './src/style/theme';

// Trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload();

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    {/* <CSSReset /> */}
    {element}
  </ThemeProvider>
);
