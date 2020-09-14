import { createGlobalStyle } from 'styled-components';

import theme from './theme';

/**
 * https://dev.to/mikewheaton/theming-with-styled-components-19ce
 */
const GlobalStyles = createGlobalStyle`
  h1 {
    font-size: ${theme.fontSizes['3xl']};
    font-weight: ${theme.fontWeights.medium};
    margin: ${theme.space[4]} 0 ${theme.space[4]} 0;
  }
  h2 {
    font-size: ${theme.fontSizes['2xl']};
    font-weight: ${theme.fontWeights.medium};
    margin-top: ${theme.space[4]};
    margin-bottom: ${theme.space[2]};
    /* border-bottom: ${theme.borders['1px']} solid ${theme.colors.gray[200]}; */
    /* background: linear-gradient(transparent 80%, #cb8182 0); */
  }
  h3 {
    font-size: ${theme.fontSizes['xl']};
    font-weight: ${theme.fontWeights.bold};
    margin-top: ${theme.space[4]};
    margin-bottom: ${theme.space[2]};
  }
  h4 {
    font-size: ${theme.fontSizes['lg']};
    margin-top: ${theme.space[2]};
    margin-bottom: ${theme.space[2]};
  }
  p {
    color: ${theme.colors.gray[900]};
    margin-top: ${theme.space[2]};
    margin-bottom: ${theme.space[2]};
  }
  hr {
    margin-top: ${theme.space[6]};
    margin-bottom: ${theme.space[4]};
    height: 2px;
  }

  @keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
  }

  a {
    color: ${theme.colors.gray[900]};
    background: linear-gradient(transparent 80%, #cb8182 0);
    transition: all 200ms;

    &:hover {
      color: ${theme.colors.white};
      background-image: linear-gradient(transparent 0, #a14444 5%);
    }
  }

  /*
   * Disable anchor tag style on links which appear to left of headers
   */
  h1 > a, h2 > a, h3 > a, h4 > a, h5 > a {
    background: none;

    &:hover {
      color: ${theme.colors.brand[500]};
      background-image: none;
    }
  }

  /**
  * Border around ordered and unordered lists
  */
  ul,
  ol {
    list-style-type: none;
    padding: ${theme.sizes[2]};
    margin: 0 0 10px 0;

    background-color: ${theme.colors.gray[50]};
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 5px;
  }

  /**
  * List elements
  */

  li {
    margin-top: 0.5rem;
    margin-bottom: 0.1rem;
  }
  li > p {
    margin-bottom: 0;
  }

  ul > li {
    margin-bottom: 5px;
  }
  ul > li {
    &:before {
      content: '▶︎';
      color: ${theme.colors.brand[500]};
      margin-right: 0.3rem;
    }
  }
  ul ul > li {
    &:before {
      content: '●';
      color: ${theme.colors.brand[500]};
      margin-right: 0.3rem;
    }
  }
  ol > li {
    counter-increment: step-counter;
    margin-bottom: 5px;
  }
  li > ul {
    margin-top: 0;
  }

  ol > li > p,
  ul > li > p {
    display: inline;
  }
  ol > li {
    &:before {
      content: counter(step-counter);
      margin-right: 0.6rem;
      font-size: 80%;
      background-color: rgb(193, 109, 109);
      color: white;
      font-weight: bold;
      border-radius: 30%;
      text-align: center;

      display: inline-block;
      width: 1.2rem;
    }
  }

  li ul, li ol {
    border: none;
    margin-left: 0.5rem;
  }

  /**
  * Table
  */
  article td {
    padding: 2px;
  }

  footer {
    margin-top: 3rem;
  }

  article footer {
    margin-bottom: 2rem;
  }

  @media only screen and (max-width:480px) {
    blockquote {
      border-color: ${theme.colors.brand[500]};
      border-width: 0.6rem;

      margin-left: 0;
      padding: ${theme.space[5]};
    }
  }

  /**
  * CODE Syntax highlighting
  *
  * okaidia theme for JavaScript, CSS and HTML
  * Loosely based on Monokai textmate theme by http://www.monokai.nl/ with many adjustments.
  *
  * Theme picked from here: https://github.com/PrismJS/prism/tree/1d5047df37aacc900f8270b1c6215028f6988eb1/themes
  */

  /**
    * Styling of command line - bash commands
    * Taken and adapted from node_modules/prismjs/plugins/command-line/prism-command-line.css
    */
  pre.language-bash code.language-bash,
  pre.language-bash-output code.language-bash-output {
    display: block;
    position: relative;
    padding: 1rem;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.16);
    padding-top: 45px;
    font-size: 0.7rem;

    &:before {
      content: '●  ●  ●';
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      background: #e1e1e1;
      color: #c2c3c4;
      width: 100%;
      font-size: 24px;
      margin: 0;
      line-height: 0;
      padding: 10px 0 10px 10px;
      text-indent: 4px;
      letter-spacing: -8px;
    }
  }

  /**
  * Styling of all other programming languages
  */
  code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    background: none;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  code[class*='language-'] {
    /* Wrap inline code blocks */
    white-space: pre-wrap;
    font-size: 0.8rem;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin-top: 10px;
    /* Make it stand out on the sides with margin */
    /* overflow: auto;
    margin-right: -30px;
    margin-left: -30px; */
  }

  /**
  * Don't have wide code blocks when in a list
  */
  li pre[class*='language-'] {
    margin-right: 0;
    margin-left: 0;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #34352f;
  }



  /**
  * Uncomment for different color inline code
  */
  /* :not(pre) > code[class*='language-'] {
    padding: 0.2em 0.3em;
    border-radius: 0.3em;
    white-space: normal;
    background: #f0e4bf;
    color: black;
    text-shadow: none;
  } */


  h1 > code[class*='language-'] {
    font-size: ${theme.fontSizes['2xl']};
  }
  h2 > code[class*='language-'] {
    font-size: ${theme.fontSizes['xl']};
  }
  h3 > code[class*='language-'] {
    font-size: ${theme.fontSizes['lg']};
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }

  .token.punctuation {
    color: #f8f8f2;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #f92672;
  }

  .token.boolean,
  .token.number {
    color: #ae81ff;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a6e22e;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #f8f8f2;
  }

  .token.atrule,
  .token.attr-value,
  .token.function {
    color: #e6db74;
  }

  .token.keyword {
    color: #66d9ef;
  }

  .token.regex,
  .token.important {
    color: #fd971f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  /**
  * Adapting styling of the prompt.
  * See https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
  * for more information.
  *
  * Taken and adapted from node_modules/prismjs/plugins/command-line/prism-command-line.css
  * Can also be imported via
  *  import 'prismjs/plugins/command-line/prism-command-line.css'
  */
  .command-line-prompt {
    float: left;
    letter-spacing: -1px;
  }

  .command-line-prompt > span {
    &:before {
      color: rgb(201, 201, 201);
      content: ' ';
      display: block;
      padding-right: 0.8em;
    }
  }

  /* Prompt for all users */
  .command-line-prompt > span[data-user]:before {
    /* content: '[' attr(data-user) '@' attr(data-host) '] $'; */
    content: '$'; /* Hide the user and host information */
  }

  /* Prompt for root */
  .command-line-prompt > span[data-user='root']:before {
    /* content: '[' attr(data-user) '@' attr(data-host) '] #'; */
    content: '#'; /* Hide the user and host information */
  }

  .command-line-prompt > span[data-prompt]:before {
    content: attr(data-prompt);
  }

  /**
  * Line numbers
  *
  * Taken and adapted from node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css
  *
  */
  pre[class*='language-'].line-numbers {
    position: relative;
    padding-left: 2.8em;
    counter-reset: linenumber;
    /* Ensure text under code-block appears after an offset */
    margin-bottom: 0.5rem;
  }

  pre[class*='language-'].line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 1em;
    font-size: 100%;
    left: 2em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    margin-left: 0.5em;
    border-right: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;

    &:before {
      content: counter(linenumber);
      color: rgb(126, 126, 126); /* Line number color */
      display: block;
      padding-right: 0.8em;
      text-align: right;
    }
  }

  /* Bash - Line numbers */
  pre.language-bash.line-numbers,
  pre.language-bash-output.line-numbers
  {
    padding: 0;
    border-radius: 6px;
    border: 0;
  }
  pre.language-bash.line-numbers,
  pre.language-bash-output.line-numbers
  {
    padding: 0;
    border-radius: 6px;
    border: 0;
  }
  pre.language-bash > span.line-numbers-rows,
  pre.language-bash-output > span.line-numbers-rows
  {
    display: none;
  }

  /**
   * Ensure correct width of code block on narrow screens
   */
  .gatsby-highlight {
    display: grid;
  }

  /**
  * Highlight line
  */
  .gatsby-highlight-code-line {
    background-color: rgb(111, 90, 90);
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #c16d6d;
  }

  /**
  * Code Title
  */
  .gatsby-remark-code-title {
    padding: 0.5em 1em;
    /* font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace; */
    font-size: 0.9em;
    font-weight: bold;

    background-color: black;
    color: white;
    z-index: 0;

    margin-bottom: -0.6rem;
    /* margin-right: -30px;
    margin-left: -30px; */

    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }

  li .gatsby-remark-code-title {
    margin-top: 0.5rem;
    margin-right: 0;
    margin-left: 0;
  }
`;

export default GlobalStyles;
