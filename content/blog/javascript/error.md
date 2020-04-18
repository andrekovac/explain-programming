---
title: 'JavaScript: Error'
description: 'The theory of errors in Javascript'
date: '2016-05-20T00:00:00.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript']
---

## Create custom error

### Custom Error

**Define base class**:

```js
export class CustomError extends Error {
    constructor(m: string) {
        super(m);
        if ('setPrototypeOf' in Object) {
            (Object as any).setPrototypeOf(this, CustomError.prototype);
        }
    }
    getUserErrorMessage(strings: TT.LocalizedStrings): string {
        return strings.GENERIC_ERROR_MESSAGE;
    }
}
```

**Define explicit class**:

```js
export class RequestError extends CustomError {
    message: string;
    serverMessage: string;

    constructor(message: string, serverMessage: string) {
        super(message);
        if ('setPrototypeOf' in Object) {
            (Object as any).setPrototypeOf(this, RequestError.prototype);
        }
        this.message = message;
        this.serverMessage = serverMessage;
    }

    getUserErrorMessage(strings: TT.LocalizedStrings): string {
        return this.serverMessage || super.getUserErrorMessage(strings);
    }
}
```

**Use**:

```js
// Do something with API request response
if (!response.ok) {
        const serverErrorMessage = await response
            .json()
            .then(data => {
                if (
                    data &&
                    (data.errorTitle || data.errorMessage || data.message || data.messages)
                ) {
                    return data.errorTitle || data.errorMessage || data.message || data.messages[0];
                }
                return null;
            })
            .catch(() => {
                return null;
            });
        throw new RequestError(
            `Error in ${method} ${url}: ${response.status} ${response.statusText}`,
            serverErrorMessage
        );
    }
```


### Custom Exception

**Define base class**:

```js
export class Exception extends CustomError {
    type: ExceptionType;
    location: string;
    message: string;
    constructor(type: ExceptionType, location: string, message: string) {
        super(`${ExceptionType[type]}: ${location}: ${message}`);
        if ('setPrototypeOf' in Object) {
            (Object as any).setPrototypeOf(this, Exception.prototype);
        }
        this.type = type;
        this.location = location;
        this.message = message;
    }
    toString(): string {
        return 'Exception: ' + this.type.toString() + ': ' + this.location + ': ' + this.message;
    }
}
```

**Define explicit class**:

```js
export class InvalidInputException extends Exception {
    constructor(args: ExceptionArgs) {
        super(ExceptionType.InvalidInput, args.location, args.message);
        if ('setPrototypeOf' in Object) {
            (Object as any).setPrototypeOf(this, InvalidInputException.prototype);
        }
    }
}
```

**Use**:

```js
if (parent == undefined) {
    throw new Exceptions.InvalidInputException({
        location: 'OpenTreeNodesImpl::toggleImpl',
        message: 'Element with id ' + (elementId || '').toString() + ' has no parent'
    });
}
```