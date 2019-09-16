---
title: 'Javascript Web Requests'
description: 'Different ways to fetch data in Javascript. See examples and compare how to make web requests with XMLHttpRequest, the Fetch API and jQuery'
date: '2019-08-25T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'jQuery', 'async']
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
