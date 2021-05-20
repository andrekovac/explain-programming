---
title: 'React Component Testing'
description: 'Using testing-library'
date: '2021-02-28'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react', 'test']
draft: true
---

## testing-library

Example of a component test:

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('should allow a user to log in', async () => {
    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/username/i), 'johnUser')

    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')).toBeInTheDocument()
    expect(await screen.findByText('John')).toBeInTheDocument()
    expect(await screen.findByText('Maverick')).toBeInTheDocument()
  })
})
```

Taken from [here](https://github.com/mswjs/examples/blob/master/examples/rest-react/src/LoginForm.test.js).
