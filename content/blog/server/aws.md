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


### Api: TODO endpoint

GraphQL endpoint: https://cvxrtnigqbemxft6zpqrrxnllq.appsync-api.eu-central-1.amazonaws.com/graphql
GraphQL API KEY: da2-iuhp5rlrsrf6dflqe5wdrh4kii


#### Useful commands

```
amplify console
```

```
amplify console api
```

```
amplify mock api
```


Test GraphQL schema:

https://eu-central-1.console.aws.amazon.com/appsync/home?region=eu-central-1#/2o3vakn4grh7pg3wltohmvqiyq/v1/schema

Test hosted auth endpoint:

https://singingforsnorers-dev.auth.eu-central-1.amazoncognito.com/login?response_type=code&client_id=3065v2vv5mpbi5s1i393el9bv8&redirect_uri=http://localhost:3000/


Confirmation redirect url:

http://localhost:3000/?code=db64917d-4294-4930-95fa-688f35f16f7d
