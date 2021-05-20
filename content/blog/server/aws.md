---
title: 'AWS - Amazon Web Services'
description: 'Some handy CLI commands for AWS Amplify to set up web or mobile apps'
date: '2020-05-20T21:22:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['server', 'continuous integration']
draft: true
---

## AWS Amplify

### AWS Cognito and IAM policies

**Cognito**, provided by: **awscloudformation**.

Cloudformation template syntax:

- [Fn::Join](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html)

    It's of the form `{ "Fn::Join" : [ "delimiter", [ comma-delimited list of values ] ] }`.

    **Example**:

    To construct `arn:aws:s3:::MyBucket/protected/*` you can do:

    ```json
    "Fn::Join": [
    "",
        [
            "arn:aws:s3:::",
            {
            "Ref": "S3Bucket"
            },
            "/protected/*"
        ]
    ]
    ```


### Api

How to set it all up:
https://stackoverflow.com/questions/60804372/proper-way-to-setup-awsappsyncclient-apollo-react

#### AWS AppSync

- I used the [AWS Mobile AppSync SDK for JavaScript](https://github.com/awslabs/aws-mobile-appsync-sdk-js#mutations--optimistic-ui-with-graphqlmutation-helper).

Use `AWSAppSyncClient` which is an `Apollo` client which talks to AWS AppSync:

```js
import AsyncStorage from '@react-native-community/async-storage';
import Auth from '@aws-amplify/auth';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';

import awsconfig from '../../aws-exports';

export const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
  },
  offlineConfig: {
    callback: (err, succ) => {
      if (err) {
        const { mutation, variables } = err;

        if (__DEV__)
          console.warn(`AWSAppSyncClient ERROR for ${mutation}`, err);
      } else {
        const { mutation, variables } = succ;

        if (__DEV__)
          console.info(`AWSAppSyncClient SUCCESS for ${mutation}`, succ);
      }
    },
    storage: AsyncStorage,
    // keyPrefix: 'awsPersist',
  },
});
```

The following commands work only if app is online. For offline support you have to use the Apollo components with render props (`Query` or `Mutation` component).

```js
import { API, graphqlOperation } from 'aws-amplify';
```

A `Rehydrated` component used to wrap your app around it:

```js
import React, {
  ReactElement,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react';
import { View, Text } from 'react-native';
import AWSAppSyncClient from 'aws-appsync';

type RehydratedProps = {
  client: AWSAppSyncClient<any>;
  renderLoading?: () => ReactElement;
};

/**
 * Load Apollo cache
 */
const Rehydrated: PropsWithChildren<RehydratedProps> = ({
  client,
  children,
  renderLoading,
}) => {
  const [rehydrated, setRehydrated] = useState(false);

  const hydrateClient = async (client: AWSAppSyncClient<any>) => {
    try {
      await client.hydrated();
      setRehydrated(true);
    } catch (error) {
      console.error('Rehydrated.tsx#hydrateClient', error);
    }
  };

  useEffect(() => {
    if (client instanceof AWSAppSyncClient) {
      hydrateClient(client);
    }
  }, [client]);

  return rehydrated ? (
    children
  ) : renderLoading ? (
    renderLoading()
  ) : (
    <View style={{ backgroundColor: 'red' }}>
      <Text>AWS REHYDRATED IS LOADING</Text>
    </View>
  );
};

export default Rehydrated;
```

It's used in `App.tsx`:

```js


return (
  <ApolloProvider client={client}>
    <Rehydrated client={client}>
      <StoreProvider>{renderApp()}</StoreProvider>
    </Rehydrated>
  </ApolloProvider>
);
```
##### Offline

- These offline helpers [supposedly don't work properly](https://github.com/awslabs/aws-mobile-appsync-sdk-js/blob/master/OFFLINE_HELPERS.md).
- [AWS AppSync Offline Reference](https://aws.amazon.com/blogs/mobile/aws-appsync-offline-reference-architecture/)

##### Get AppSync running with Apollo 3

- **AWS AppSync** relies on outdated Apollo Client v2.4. with offline support.
  - [No offline support](https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/448)!
  - See [these](https://stackoverflow.com/questions/63438293/cannot-connect-apollo-client-to-aws-appsync) issues.

```js
import { createAuthLink } from 'aws-appsync-auth-link';

const url = awsconfig.graphqlEndpoint;
const region = awsconfig.region;
const auth = {
  type: AUTH_TYPE.AWS_IAM,
  credentials: () => Auth.currentCredentials(),
};
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
```

#### DataStore

- [Amplify DataStore Intro](https://aws.amazon.com/blogs/aws/amplify-datastore-simplify-development-of-offline-apps-with-graphql/)
#### Mocking

```
amplify mock api
```


#### Useful commands

```
amplify console
```

```
amplify console api
```

