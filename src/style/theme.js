import { theme } from '@chakra-ui/core';

/**
 * Breakpoints always defined as great equal value
 */
const breakpoints = ['360px', '768px', '1024px', '1440px'];
// const breakpoints = ["30em", "48em", "62em", "80em"];

breakpoints.sm = breakpoints[0]; // greater than 360px
breakpoints.md = breakpoints[1]; // greater than 768px
breakpoints.lg = breakpoints[2]; // greater than 1024px
breakpoints.xl = breakpoints[3]; // greater than 1440px

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Generated with https://smart-swatch.netlify.app/#c16d6d
    brand: {
      50: '#ffe9e9',
      100: '#eec7c7',
      200: '#dca5a5',
      300: '#cb8182',
      400: '#bb5e5e',
      500: '#a14444',
      600: '#7e3435',
      700: '#5b2525',
      800: '#391515',
      900: '#1b0404',
    },
    // brand: {
    //   900: '#1a365d',
    //   800: '#153e75',
    //   700: '#2a69ac',
    // },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
};

export default customTheme;
