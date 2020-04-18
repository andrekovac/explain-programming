import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import fairyGatesTheme from 'typography-theme-fairy-gates'

fairyGatesTheme.plugins = [
  new CodePlugin(),
]

fairyGatesTheme.googleFonts = [{
  name: "Roboto",
  styles: ["300"]
}, {
  name: "Quattrocento Sans",
  styles: ["400", "400i", "700"]
}];
fairyGatesTheme.headerFontFamily = ["Roboto", "sans-serif"];
fairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  a: {
    color: 'rgb(193, 109, 109)',
    textDecoration: "none",
    backgroundImage: "none",
  },
  "a:hover,a:active": {
    textDecoration: "none",
    textShadow: "none",
    backgroundImage: "none",
    // color: 'rgb(100, 56, 56)'
    backgroundColor: 'rgb(193, 109, 109)',
    color: 'white',
    padding: 2,
    borderRadius: 5,
  },
  blockquote: {
    borderColor: 'rgb(193, 109, 109)',
  },
})

const typography = new Typography(fairyGatesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography

export const rhythm = typography.rhythm
export const scale = typography.scale
