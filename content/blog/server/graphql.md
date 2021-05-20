---
title: 'GraphQL'
description: 'GraphQL database query language'
date: '2020-11-26'
author: 'André Kovac'
category: 'tool'
tags: ['server']
draft: true
---

## Apollo

### Api calls (while online)

```js
import { API, graphqlOperation } from '@aws-amplify/api';
import { listExercises } from './src/graphql/queries';

const exercisesData = await API.graphql(graphqlOperation(listExercises));
```


### Apollo v2.4

GraphQL and React:

**Imports**:

```js
import {
  Query,
  Mutation,
  ApolloConsumer,
  graphql,
  compose,
} from 'react-apollo';

import gql from 'graphql-tag';
```

#### `Query` and `Mutation` components

##### `Query`

Example

```js
const ExercisesQuery = () => (
  <Query
    query={gql(listExercises)}
    notifyOnNetworkStatusChange={true}
    // fetchPolicy={'network-only'}
    onError={error => console.log('ExercisesQuery#onError', error)}
    onCompleted={() => console.log('Completed')}
  >
    {/* @ts-ignore */}
    {({ loading, error, data, networkStatus }) => {
      console.log({ networkStatus });
      if (networkStatus) if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>{`Error :( ${error.message}`}</Text>;

      return (
        {data?.listExercises?.items?.map(
            ({ id, title }, index) => (
                <View style={{ backgroundColor: 'yellow' }} key={id}>
                <Text>{`Title: ${title}`}</Text>
                <Text>{`ID: ${id}`}</Text>
                </View>
            )
        )}
      );
    }}
  </Query>
);
```

##### `Mutation`

If you **mutate** state which is shown on the same screen as the one you are on, use either `refetchQueries` or the more flexible `update` function to update the local Apollo cache so that the new values are displayed.

```js
<Mutation
    refetchQueries={[
      {
        query: gql(listExercises),
      },
    ]}
  >
```

**Note**: `update` is called twice! That's why the `updateCount` variable was introduced. See this [SO thread](https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/282) for more.

```js
let updateCount = 0;

<Mutation
    update={(cache, { data: { createExercise } }) => {
      if (updateCount === 0) {
        const { listExercises: exercises } = cache.readQuery({
          query: gql(listExercises),
        });
        cache.writeQuery({
          query: gql(listExercises),
          data: {
            listExercises: {
              ...exercises,
              items: exercises.items.concat([createExercise]),
            },
          },
        });
      }
      updateCount++;
    }}
  >
```

Full Example:

```js
let updateCount = 0;

const ExercisesMutation = () => (
  <Mutation
    mutation={gql(createExercise)}
    awaitRefetchQueries={true}
    optimisticResponse={{
      __typename: 'Mutation',
      createExercisex: {
        __typename: 'Exercise',
        createdAt: new Date(),
        title: 'Temporary Title',
        focus: '...some nice focus...',
        muscle: 'maybe throat...',
        level: Level.ONE,
      },
    }}
    refetchQueries={[
      {
        query: gql(listExercises),
      },
    ]}
    onError={(error) => console.log('ExercisesMutation#onError', error)}
    onCompleted={(data) => {
      updateCount = 0;
      console.log('Completed', { data });
    }}
  >
    {/* @ts-ignore */}
    {(createExercise, { data, loading, error, networkStatus }) =>
      loading ? (
        <View>
          <Text>PLEASE WAIT!!!</Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: 'green' }}
            onPress={() => {
              createExercise({
                variables: {
                  input: {
                    title: 'New Exercise',
                    muscle: 'throat',
                  },
                },
              });
            }}
          >
            <Text style={{ color: 'white' }}>Run Mutation</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: 'orange' }}>
            <Text>{`Title: ${data?.createExercise?.title}`}</Text>
          </View>
        </View>
      )
    }
  </Mutation>
);
```

##### Make sure new mutation is rendered on screen after deletion

You have to wrap a `Query` component inside of a `Mutation` component (`awaitRefetchQueries` option is not necessary here):

This chaining is described in [this good SO answer](https://stackoverflow.com/a/49320606/3210677).

```js
const ExerciseDeleteMutation = () => (
  <Mutation
    mutation={gql(deleteExercise)}
    // awaitRefetchQueries={true}
    refetchQueries={[
      {
        query: gql(listExercises),
      },
    ]}
    onError={error =>
      console.log('ExerciseDeleteMutation#onError', error)
    }
    onCompleted={data =>
      console.log('ExerciseDeleteMutation#onCompleted', { data })
    }
  >
    {/* @ts-ignore */}
    {(deleteExercise, { data, loading, error, networkStatus, client }) => {
      return (
        <Query
          query={gql(listExercises)}
          onError={error =>
            console.log('ExerciseDeleteMutationQuery#onError', error)
          }
          onCompleted={() =>
            console.log('ExerciseDeleteMutationQuery#onCompleted')
          }
        >
          {/* @ts-ignore */}
          {({ data: queryData }) => {
            const itemId = queryData?.listExercises?.items?.[0]?.id;

            return loading ? (
              <View><Text>PLEASE WAIT!!!</Text></View>
            ) : (
              <View>
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: 'red' }}
                  onPress={() => {
                    deleteExercise({
                      variables: {
                        input: {
                          id: itemId,
                        },
                      },
                    });
                  }}
                >
                  <Text
                    style={{ color: 'white' }}
                  >{`Delete id ${itemId}`}</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: 'orange' }}>
                  <Text>{`Title: ${data?.deleteExercise?.title}`}</Text>
                  <Text>{`Date: ${data?.deleteExercise?.createdAt}`}</Text>
                  <Text>{`id: ${data?.deleteExercise?.id}`}</Text>
                </View>
              </View>
            );
          }}
        </Query>
      );
    }}
  </Mutation>
);
```

##### `ApolloConsumer`

Example:

```js
const runExerciseQuery = async client => {
  const { data } = await client.query({
    query: gql(listExercises),
    // fetchPolicy: 'network-only',
    // variables: { id: "foo" }
  });
  const length = data?.listExercises?.items?.length;
  console.log('++++++++++ RUN QUERY RESULT', {
    length,
    item: data?.listExercises?.items?.[length - 1],
  });
};
```

```js
<ApolloConsumer>
  {client => (
    <TouchableOpacity
      style={{ padding: 10, backgroundColor: 'blue' }}
      onPress={() => {
        runExerciseQuery(client);
      }}
    >
      <Text style={{ color: 'white' }}>Run Query</Text>
    </TouchableOpacity>
  )}
</ApolloConsumer>
```

##### `graphql` HOC

##### Directly run mutation on Apollo `client` object

See example [here](https://docs.amplify.aws/lib/graphqlapi/offline/q/platform/js#without-helper).

##### `apollo-link`

With `apollo-link` you can manage a local store with Apollo and don't need to add libraries like `redux`.

### Apollo v3

- `useQuery` and `useMutation` components.

## Tools

- [GraphiQL](https://github.com/graphql/graphiql)
- [GraphiQL.app - A light, Electron-based wrapper around GraphiQL.](https://github.com/skevy/graphiql-app)

- GraphQL Code generator: [https://graphql-code-generator.com/]()

## Tutorials

- [Great resource - Relay and GraphQL Introduction Materials](https://quip.com/oLxzA1gTsJsE)

- [Moving from REST to GraphQL
  ](https://medium.com/@frikille/moving-from-rest-to-graphql-e3650b6f5247#.ubhl3o4b3)
- [Give it 5 days – Facebook Relay and GraphQL](http://red-badger.com/blog/2015/08/28/give-it-5-days-facebook-relay-and-graphql/)

## Laravel & GraphQL

- [Laravel GraphQL](https://github.com/Folkloreatelier/laravel-graphql)
- [First steps with GraphQL in Laravel Framework - Part One](http://blog.mauriziobonani.com/first-steps-with-graphql-in-laravel-part-one/)

Other package:

- [laravel-graphql-relay](https://github.com/nuwave/laravel-graphql-relay)
  - Examples, Videos [See Issue Discussion](https://github.com/nuwave/laravel-graphql-relay/issues/2)

## React Native and Redux

Working example: [React-Native 0.19.0 & Redux 3.1.7 & React-Redux 4.1.2](https://github.com/alinz/example-react-native-redux)

## React Native & Relay Test

Example in [react-native-relay](https://github.com/lenaten/react-native-relay) works out of the box!

Strongly debated issue: [Make Relay work with React Native out of the box #26](https://github.com/facebook/relay/issues/26#issuecomment-159192009)
