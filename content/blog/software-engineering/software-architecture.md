---
title: 'Software architecture and Design patterns'
date: '2021-07-29'
author: 'André Kovac'
description: 'Design patterns and different approaches to define software architecture'
category: 'theory'
tags: ['architecture', 'engineering', 'software']
draft: true
ready: false
published: false
---

## Functional programming patterns / functional design patterns

### Static types for domain modeling and documentation

- **DDD** [Domain Driven Design](https://fsharpforfunandprofit.com/ddd/)

Don't lie with function types. Use total functions:

- **Constrain** the **input** type
- **Extend** the **output** type

taken from this [great talk ~1h about functional programming patterns](https://www.youtube.com/watch?v=srQt1NAHYC0).

### Parametrize everything ("all the things")

Collection functions instead of loop

- Experienced programmer: Don't hard code (initial) values -> parametrize it.
- Functional programmer: Don't hard-code the *behavior* (action) -> parametrize it.

Function type (i.e. definition of function signature) acts as Interface.


### Dependency injection

- happens via parameters you pass into a function
- partial function application

- Funtion as a thing -> zero parameters -> it's a lambda

**Prerequisite**: One parameter function: 1 input and one output

### Move responsibility to caller

Add actions for each case instead of throwing exceptions.

## Talks

- See [this great presentation](http://ps.informatik.uni-tuebingen.de/teaching/ws16/sdpt/functionalpatterns.pdf) which compares functional programming patterns to object oriented programming design patterns.
- An interesting thread about [functional programming design patterns](https://softwareengineering.stackexchange.com/questions/89273/where-are-all-the-functional-programming-design-patterns).

## Object oriented programming patterns

### [Coupling](https://en.wikipedia.org/wiki/Coupling_(computer_programming)): Tight vs. loose coupling

- **Tight** coupling: In class A call a method defined in class B.
- **Loose** coupling: In class A call a method defined in an interface which the class B has to implement.

### Dependency Injection

- Class is not tightly coupled to its dependencies (does not create it's dependencies with **new** keyword)
- Class is loose coupled to its dependencies (via interfaces)

### Cohesion

- Watch [this video ~26min about cohesion and coupling in Python code](https://www.youtube.com/watch?v=eiDyK_ofPPM).

### Sources

Read book "Design Patterns"
