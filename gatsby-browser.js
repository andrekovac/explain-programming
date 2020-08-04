import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import ChakraTheme from './src/style/chakraTheme';

// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

// Trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload();

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={ChakraTheme}>
    <CSSReset />
    {element}
  </ThemeProvider>
);
