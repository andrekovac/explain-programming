import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import fairyGatesTheme from 'typography-theme-fairy-gates';

import theme from './theme';

fairyGatesTheme.plugins = [new CodePlugin()];

fairyGatesTheme.googleFonts = [
  {
    name: 'Mulish',
    styles: ['300'],
  },
  {
    name: 'Quattrocento Sans',
    styles: ['400', '400i', '700'],
  },
];
fairyGatesTheme.headerFontFamily = ['Mulish', 'sans-serif'];
fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    textDecoration: 'none',
    backgroundImage: 'none',
    textShadow: 'none',
  },
  blockquote: {
    borderColor: theme.colors.brand[500],
    backgroundColor: theme.colors.brand[50],

    marginTop: '1rem',
    padding: theme.space[5],
    borderRadius: theme.radii.lg,
  },
});

const typography = new Typography(fairyGatesTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;

export const rhythm = typography.rhythm;
export const scale = typography.scale;
