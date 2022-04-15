---
title: 'React Router'
description: 'Routing in React Web Applications'
date: '2021-11-01'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react', 'routing']
draft: true
---

## Switch routing

- **Declarative**:

  ```js
  <Switch>
    <Route>
      <Welcome foo="bar" />
    </Route>
  </Switch>
  ```

- **Imperative**:

  ```js
  <Switch>
    <Route path="/" component={<Welcome />}>
  </Switch>
  ```

  Use `render` instead of `component` to pass props:

  ```js
  <Switch>
    <Route path="/" render={() => <Welcome foo="bar" />}>
  </Switch>
  ```

## Redirect

Do on of these two things:

- **Declarative**: `<Redirect to="/welcome" />`
- **Imperative**: `history.push("/welcome")`

## Link

- `<Link to="/welcome" />`

## v6 Authentication

Nice example: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx