---
title: 'Spring Boot'
description: 'Spring Boot Java Framework'
date: '2021-11-02'
author: 'André Kovac'
category: 'other'
tags: ['server', 'dev-ops']
draft: true
---

## Spring Boot Security

Learned most from this video: https://www.youtube.com/watch?v=VVn9OG9nfH0

## Relationships

### One-to-many

- `@ManyToOne`: Add it to the non-owner side to make it a bidirectional relationship
  - Bidirectional means that we are able to access each entity from the other one.
- `mappedBy`: Tell Hibernate which variable we are using to represent the parent class in our child class.

### Many-to-many

- Bidirectional relationship
- Owner side of relationship (`joinColumn`) and non-owner side (`inverseJoinColumn`)

### Cascades

- Target entity & associated entity

- Cascade operations from parent to child

Many-to-many or 1-to-1 relationships should


### Lazy vs. eager loading

- **JPA** (Java Persistance API) is an ORM specification.
- The Hibernate ORM is an implementation of the JPA specs