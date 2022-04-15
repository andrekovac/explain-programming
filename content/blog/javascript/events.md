---
title: 'JavaScript events'
description: 'event listening and handling'
date: '2021-09-03'
author: 'André Kovac'
category: 'framework'
tags: ['javascript']
---

## event handling

Learned that every extra event listener (if not removed) will trigger new event --> They can multiply if applied wrong and cause app to lag!

```ts
useEffect(() => {
  const buttonRef = innerRef.current;

  if (Platform.OS === 'web') {
    (buttonRef as HTMLDivElement | null)?.addEventListener('keydown', handleKeyDown);
  }
  return () =>
    (buttonRef as HTMLDivElement | null)?.removeEventListener('keydown', handleKeyDown);
}, [handleKeyDown, innerRef]);
```

