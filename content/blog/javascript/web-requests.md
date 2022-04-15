---
title: 'Javascript Web Requests'
description: 'Different ways to fetch data in Javascript. See examples and compare how to make web requests with XMLHttpRequest, the Fetch API and jQuery'
date: '2019-08-25T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'jQuery', 'async']
draft: false
ready: true
published: false
---

The global `fetch` function is an easier way to make web requests and handle responses compared to using an `XMLHttpRequest`.

## XMLHttpRequest

Example:

```js
function loadDoc() {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById('demo').innerHTML = xhttp.responseText
    }
  }
  xhttp.open('GET', 'demo_get2.asp?fname=Henry&lname=Ford', true)
  xhttp.send()
}
```

## Fetch

- works with Promises
- with ES6 (Babel) (as used in `react native` tutorial):

```js
fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.movies,
        });
      })
      .catch(err => console.log(err))
      .done(); // always make sure to call done() or any errors thrown will get swallowed.
  },
```

`fetch` returns a Promise, `response.json()` again returns a Promise which can then be resolved to yield the response data if successful.

## jQuery `$.ajax()`

```js
// Store an id form a DOM element to be sent in your request
var menuId = $('ul.nav').first().attr('id')
// Define the request
var request = $.ajax({
  url: 'script.php',
  method: 'POST',
  data: { id: menuId },
  dataType: 'html',
})

// Display the result of the request inside the DOM element with the id `log`
request.done(function(msg) {
  $('#log').html(msg)
})
// In case the request throws an error, show an alert
request.fail(function(jqXHR, textStatus) {
  alert('Request failed: ' + textStatus)
})
```

or

```js
// Assign handlers immediately after making the request,
// and remember the jqXHR object for this request
var jqxhr = $.ajax('example.php')
  .done(function() {
    alert('success')
  })
  .fail(function() {
    alert('error')
  })
  .always(function() {
    alert('complete')
  })

// Perform other work here ...

// Set another completion function for the request above
jqxhr.always(function() {
  alert('second complete')
})
```

## Concepts

### Interceptors

#### Axios

> Interceptors are a feature that allows an application to intercept requests or responses before they are handled by the . then() or the . ... Well, as I mentioned above, suppose every HTTP request needs a header property attached to it, in order to verify the application requesting data is allowed to access that data.

taken from [this article](https://blog.bitsrc.io/setting-up-axios-interceptors-for-all-http-calls-in-an-application-71bc2c636e4e).

#### `fetch`

- [fetch-intercept](https://github.com/werk85/fetch-intercept) is a library to implement intercepts with the fetch API.

  - It's idea is to attach an intercept function to the global `fetch` object. See [this code of the library](https://github.com/werk85/fetch-intercept/blob/develop/src/attach.js).

  - [This article](https://ckgrafico.medium.com/aborting-and-intercepting-requests-using-fetch-api-60ffa7619e80) also mentions the lib.

## Authentication with auth0

[Universal login - Secure login infrastructure to authenticate users to your apps](https://auth0.com/universal-login)