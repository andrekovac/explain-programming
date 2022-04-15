---
title: 'Prisma - Database ORM'
description: ''
date: '2021-01-30'
author: 'André Kovac'
category: 'other'
tags: ['backend', 'ORM']
draft: true
---

## Query filtering

```
where: { processId, OR: [{ state: "DRAFT" }, { state: "PUBLISHED" }] },
```

### [Filter within `include`](https://www.prisma.io/docs/concepts/components/prisma-client/filtering#filter-within-include)



## Mutation

```ts
import { AuthorizationError, Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateManyArgs = Prisma.TechnologyEntryUpdateManyArgs | Prisma.BreakEvenEntryUpdateManyArgs

export default async function publishProcess(processId: number, ctx: Ctx) {
  ctx.session.authorize()

  if (!ctx.session.roles.includes("admin")) {
    throw new AuthorizationError("only admins are allowed to publish a process")
  }

  const publishTime = new Date()

  const draftToPublished: UpdateManyArgs = {
    where: { processId, OR: [{ state: "DRAFT" }, { state: "PUBLISHED" }] },
    data: { state: "PUBLISHED", publishedAt: publishTime, updatedAt: publishTime },
  }

  await Promise.all([
    db.breakEvenEntry.updateMany(draftToPublished),
    db.projectPhase.updateMany(draftToPublished),
    db.technologyEntry.updateMany(draftToPublished),
    db.costEntry.updateMany(draftToPublished),
  ])

  return {}
}
```