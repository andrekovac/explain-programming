// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

// Add a fancy prompt for `shell` or `bash` code fields
import 'prismjs/plugins/command-line/prism-command-line.css'
// Line numbers
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// Global styles are inside components/layout.css (used by layout.js)

// Trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload();
