---
title: 'Blitz.js - Framework to build web apps fast'
description: 'Inspired by Ruby on Rails with modern React stack'
date: '2021-01-12'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'react']
---

## Idea

Ruby on Rails for React Full-Stack Development

> Convention over configuration

- By default code is organized code by domain context

### Can blitz be easily

## Authentication

Example of admin/user separation:

```tsx
import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProcessInput = Pick<Prisma.FindFirstProcessArgs, "where" | "include">

export default async function getProcess({ where, include }: GetProcessInput, ctx: Ctx) {
  ctx.session.authorize()

  const isAdmin = ctx.session.roles.includes("admin")

  const process = await db.process.findFirst({
    where: {
      ...where,
      userId: isAdmin ? undefined : ctx.session.userId,
    },
    include,
  })

  if (!process) throw new NotFoundError()

  return process
}
```

It prevents unauthorized access from other users: If you simply go to `/processes/1`, even you’re not the owner of the process, you would still be able to access it. When we check for the `userId`, we wouldn’t receive a process if it doesn’t match. As `admin` we should still have access to the process, so setting the `userId` to `undefined` let’s **Prisma** ignore this property when constructing the SQL-query.

### [Error handling](https://blitzjs.com/docs/error-handling#built-in-errors)

Deal with `AuthenticationError`:

```tsx
if (error instanceof AuthenticationError) {
  return { authError: "Sorry, those credentials are invalid" }
}
```

## [Server-side Rendering](https://blitzjs.com/docs/pages#server-side-rendering)

**Server-side Rendering** is also referred to as "SSR" or "Dynamic Rendering".

**Why?**: Dynamic update of content...

### Server-side rendering in blitz.js

- `getServerSideProps` function

	> To use Server-side Rendering for a page, you need to `export` an `async` function called `getServerSideProps`. This function will be called by the server on **every** request.

- **Serialization**: Next.js forces values have to serialized.
- Have to use Promises since I can't use Blitz's `useQuery` hook.

```tsx
const serializeValue = <T extends { createdAt: Date; updatedAt: Date }>(valueToSerialize: T) => ({
  ...valueToSerialize,
  updatedAt: valueToSerialize.updatedAt.toISOString(),
  createdAt: valueToSerialize.createdAt.toISOString(),
})

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const processId = Number(params?.processId)
  const session = await getSessionContext(req, res)

  const [automationPotentialResult, processResult] = await Promise.allSettled([
    getAutomationPotential(processId, { session }),
    getProcess({ where: { id: processId }, include: { assessments: true } }, { session }),
  ])

  const process =
    processResult.status === "fulfilled"
      ? (omit(processResult.value, ["assessments"]) as Process)
      : null
  const automationPotential =
    automationPotentialResult.status === "fulfilled" ? automationPotentialResult.value : null
  const assessments: Assessment[] =
    processResult.status === "fulfilled"
      ? (processResult.value as Process & {
          assessments: Array<Assessment>
        }).assessments
      : []

  return {
    // NB: everything must be serializable, so no `Date` or `undefined`
    props: {
      process: process ? serializeValue(process) : null,
      automationPotential,
      assessments: assessments.map(serializeValue),
      user: session.publicData,
    },
  }
}
```

Some related types:

```ts
type SerializedEntity<T> = Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
}
type SerializedProcess = SerializedEntity<Process>
type SerializedAssessment = SerializedEntity<Assessment>
```


## Notes

- Blitz.js has similar idea like [RedwoodJS](https://redwoodjs.com/).