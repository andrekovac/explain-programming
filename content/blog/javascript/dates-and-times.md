---
title: 'Dates and times in JavaScript'
description: 'Understand dealing and formatting of dates'
date: '2021-02-07'
author: 'André Kovac'
category: 'framework'
tags: ['javascript']
---

## Motivation

Dealing with dates and times can be a hustle!

### Issues

1. Dates are not correct
2. `toLocaleTimeString` gives different results on different machines!


### Date not correct!

Check whether one date is before the next doesn't work reliably!

[This SO answer](https://stackoverflow.com/a/51062145/3210677) helped by saying one should just

But why does an ISO time string throw an error? i.e. `2010-03-21T00:00:00.000Z` or `2010-03-21T00:00:00.135Z` can't be properly compared, but `2010-03-21T00:00:00` can?


### `toLocaleTimeString` craziness!

This function makes me scratch my head!

```ts
/**
 * Transfrom an ISO time string into the format hh:mm
 */
export const getFormattedTime = (isoTimeString: string): string => {
  const date = new Date(isoTimeString);
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date.toLocaleTimeString([], formatOptions);
};
```

with this test

```ts
describe('getFormattedTime', () => {
    it.skip('correctly formats a time', () => {
      const testIsoTime = '2021-01-13T15:40:35.346660Z';
      const result = getFormattedTime(testIsoTime);
      // TODO: Investigate - time could differ on other machines.
      expect(result).toEqual('16:40');
    });
  });
```

- This test is successful on some machines and fail on others.
- There might be an [issue with node version](https://github.com/nodejs/node/issues/8500#issuecomment-556501787) but it's very odd.


### [`Date` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)

### Decoding of an ISO Date String

- Example: `2021-02-05T20:01:14.665000Z`

  > `Z` means **zero hour offset** also known as **Zulu time** (UTC)

  from [this SO answer](https://stackoverflow.com/a/8405125/3210677)

  > If the time is in UTC, add a Z directly after the time without a space. Z is the zone designator for the zero UTC offset. "09:30 UTC" is therefore represented as "09:30Z" or "0930Z". "14:45:15 UTC" would be "14:45:15Z" or "144515Z".

  taken from [here](https://stackoverflow.com/a/49327746/3210677)


Convert Date into ISOString:

```js
createdAt: new Date('2021-02-05T20:01:14.665000Z').toISOString(),
```

Convert **ISOString** into **Date**:

```js
// Milliseconds and time-zone identifier Z caused wrong date comparisons
  const date = new Date(dateAsIsoString.replace(/\.\d+Z$/, ''));
```


### new Date() vs. Date.now()

`Date` can be filled in [many different ways](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#several_ways_to_create_a_date_object).

```js
// year, monthIndex, optionally: day, hours, minutes, seconds, milliseconds
const date = new Date(2010, 12, 31, 15, 30, 0);
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date




## Examples

### `isToday`

```ts
const isToday = (date: Date): boolean => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};
```

###