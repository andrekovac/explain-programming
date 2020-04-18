---
title: 'Go-lang'
description: 'Some basic go-lang commands'
date: '2016-07-28T21:22:00.169Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['basic']
---

## Language

### [Pointers](http://www.cplusplus.com/doc/tutorial/pointers/)

>To get the **pointer** of a value, use the **&** symbol in front of the value; to **dereference** a pointer, use the **\*** symbol.

>The variable that stores the address of another variable is called a pointer.

* Use *value pointed to operator* **\*** also to declare (signify) a pointer (i.e. a symbol to represent it's type *pointer*) when it is an argument of a function.
* Use *Address-of operator* **&** on a pointer to reveal its location in memory

```go
package main

import "fmt"

type Artist struct {
	Name, Genre string
	Songs       int
}

func newRelease(a *Artist) int {
	a.Songs++
	return a.Songs
}

func main() {
	me := &Artist{Name: "Matt", Genre: "Electro", Songs: 42}
	fmt.Printf("%s released their %dth song\n", me.Name, newRelease(me))
	fmt.Printf("%s has a total of %d songs", me.Name, me.Songs)
}
```

Output: The number of songs `me.Songs` changes, i.e the artist is passed by reference via the pointer `me`:

```go
Matt released their 43th song
Matt has a total of 43 songs
```

When passed by value, the output would have been `42 songs` instead.

####### Struct pointers

[Pointers to structs](https://tour.golang.org/moretypes/4)

```go
type Point struct {
	X, Y int
}

var (
	q = &Point{1, 2} // has type *Point
)
```

If `q` is of type *Point, where Point is of type struct, then `(*q).X` can be abbreviated as `q.X`. This syntactic sugar here makes explicit dereferencing obsolete.

`*(&(*q))` is equivalent to `*q` or `(*q)`.

### Method receivers

>A **method** is a function that has a defined **receiver**, in OOP terms, a method is a **function** on an **instance** of an object.

```go
package main

import (
	"fmt"
)

type User struct {
	FirstName, LastName string
}

func (u *User) Greeting() string {
	return fmt.Sprintf("Dear %s %s", u.FirstName, u.LastName)
}

func main() {
	u := &User{"Matt", "Aimonetti"}
	fmt.Println(u.Greeting())
}
```


### Types

```go
package main

import (
	"fmt"
)

type Point struct {
	X, Y int
}

var (
	p = Point{1, 2}  // has type Point
	q = &Point{1, 2} // has type *Point
	r = Point{X: 1}  // Y:0 is implicit
	s = Point{}      // X:0 and Y:0
)

fmt.Println(p.X, p.Y, q.X, (*q).X)
```

## Run

Build and run:

	go run main.go

1. Builds the `hello` command, producing an executable binary

		go install github.com/user/hello

2. Run the executable

		$GOPATH/bin/hello

	or just the following because $GOPATH/bin is in the `PATH`

		hello

### Run with parameters

	./main -host="http://myserver.com" -repeats=3 -concurreny=2 -image="blub"

or

	go run main.go -host="http://myserver.com" -image="my_image" -concurrency=y_image" -concurrency=5 -repeats=2

### cross compiling

Cross-compile to create executable for other systems

	GOOS=linux go build main.go

Run as executable

	./main

## Learn go lang

* [Go Bootcamp](http://www.golangbootcamp.com/book)
* [Go Playground](https://play.golang.org/)