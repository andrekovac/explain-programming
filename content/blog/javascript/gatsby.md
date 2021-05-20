---
title: 'Gatsby.js - Framework to build blogs and server-side rendering pages fast'
description: 'Gatbsy.js '
date: '2021-01-12'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react']
---

## GraphQL in Gatsby

Files in the `pages` folder can run a GraphQL query. Its results will be available as a `data` prop in the React component in the same file:

```js
import React from "react"
import { graphql } from "gatsby"
export default function Page({ data }) {
  return (
    <div>
      <h1>About {data.site.siteMetadata.title}</h1>
      <p>We're a very cool website you should return to often.</p>
    </div>
  )
}
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

- To run GraphQL queries in non-page components you’ll need to use Gatsby’s `<StaticQuery />` component.