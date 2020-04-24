import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import fairyGatesTheme from 'typography-theme-fairy-gates';

fairyGatesTheme.plugins = [new CodePlugin()];

fairyGatesTheme.googleFonts = [
  {
    name: 'Roboto',
    styles: ['300'],
  },
  {
    name: 'Quattrocento Sans',
    styles: ['400', '400i', '700'],
  },
];
fairyGatesTheme.headerFontFamily = ['Roboto', 'sans-serif'];
fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    textDecoration: 'none',
    backgroundImage: 'none',
    color: 'rgb(193, 109, 109)',
  },
  'a:not(.main)': {
    color: 'rgb(121, 107, 107)',
  },
  'a:hover:not(.main), a:active:not(.main)': {
    color: 'rgb(193, 109, 109)',
  },
  'a:not(.anchor):not(.normal):not(.main)': {
    color: 'rgb(193, 109, 109)',
    padding: '1px 2px',
    borderRadius: '4px',
  },
  'a:hover:not(.anchor):not(.normal):not(.main),a:active:not(.anchor):not(.normal):not(.main)': {
    textDecoration: 'none',
    textShadow: 'none',
    backgroundImage: 'none',
    // color: 'rgb(100, 56, 56)'
    backgroundColor: 'rgb(193, 109, 109)',
    color: 'white',
    padding: 2,
    borderRadius: 5,
  },
  'h2, h3, h4, h5, h6': {
    marginTop: rhythm(1.2),
    marginBottom: rhythm(0.4),
  },
  h4: {
    color: 'grey',
    fontWeight: 'bold',
  },
  blockquote: {
    borderColor: 'rgb(193, 109, 109)',
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
