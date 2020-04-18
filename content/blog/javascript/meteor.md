---
title: 'Meteor'
description: 'Meteor framework to build user interfaces'
date: '2015-11-29'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'outdated']
---

* [Meteor documentation](http://docs.meteor.com/#/full/)
* [Udemy Online Course](https://www.udemy.com/learn-meteorjs-by-building-10-real-world-projects/learn/#/lecture/3335892)
* [Atmosphere - Add Ons Catalogue](https://atmospherejs.com/)

## New App - First steps

```bash
meteor create
```

## start server

```bash
meteor
```

## React

```bash
meteor add react
```

## basic html file must contain

```js
<body>
  <div id="render-target"></div>
</body>
```

### Use packages (templates) with React

Write Wrapper Component (here: `AccountsUIWrapper.jsx`), here with data:

```js
AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    // this.view = Blaze.render(Template.loginButtons,
      // React.findDOMNode(this.refs.container));
    this.view = Blaze.renderWithData(Template.loginButtons, {
        align: "right"
    }, React.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
});
```

or without data:

```js
this.view = Blaze.render(Template.loginButtons,
	React.findDOMNode(this.refs.container));
```

### Other tipps

* See `simple-todos-react` project

* Use `ReactDOM` instead of `React` in setting up Client.

	```js
	Meteor.startup(function () {
	    // Use Meteor.startup to render the component after the page is ready
	    ReactDOM.render(<App />, document.getElementById("render-target"));
	  });
	```

* If you have templates as html files, use Blaze Templates as React Comonents with the [4commerce:blaze-as-react](https://atmospherejs.com/4commerce/blaze-as-react?__hstc=253494166.57d7c32374cb2a6fecb172c7dc60de4a.1456512623443.1456512623443.1456512623443.1&__hssc=253494166.8.1456512623444&__hsfp=2498493315) package.

### Addition resources

[React-in-meteor homepage](http://react-in-meteor.readthedocs.org/en/latest/)

## Rapid Prototyping vs. secure & auto-publish

Make app secure: Direct requests to database are not possible from Client. Requests have to be made via methods.

	meteor remove insecure
	meteor remove autopublish

## mongo db database

[MONGODB MANUAL](https://docs.mongodb.org/manual/tutorial/)

### Access database

	$ meteor mongo
	> db.tasks.insert({ text: "Hello world!", createdAt: new Date() });

### Delete all tables in the database of the project

	$ meteor reset

[Reactive Joins In Meteor](https://www.discovermeteor.com/blog/reactive-joins-in-meteor/)

## Database queries with react

```js
mixins: [ReactMeteorData],

getMeteorData() { ... }
```



## Spacebars

Handlebars Extension for Meteor
[Understanding Spacebars](http://meteorcapture.com/spacebars/#helpers-arguments)

## Promises

[Meteor.promise](http://okgrow-promise.meteor.com/)

## HTTP requests

1. Add HTTP package

		$ meteor add http

2. Define HTTP Call on **Server**

	```js
	  Meteor.methods({
	    callAlchemy: function(apikey, image_url) {
	      this.unblock();
	      return Meteor.http.call(
	          "GET",
	          "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedImageKeywords",
	          { params: {
	            "apikey": apikey,
	            "url": image_url,
	            "outputMode": "json"
	          }}
	      );
	    }
	  });
	```

3. Invoke the HTTP call with callback on **client**

	```js

	//invoke the server method
	Meteor.call("callAlchemy", apikey, image_url, function(error, results) {
      console.log(results.data);
   });
	```

#### Publishing data from an external API

* [Publishing data from an external API](http://meteorcapture.com/publishing-data-from-an-external-api/)

### Links

* [Meteor: Calling server method from client](https://gist.github.com/nachiket-p/2964422)
* [Understanding Meteor Wait Time & this.unblock](https://meteorhacks.com/understanding-meteor-wait-time-and-this-unblock)
* [Using the HTTP Package](https://themeteorchef.com/snippets/using-the-http-package/#tmc-jsonplaceholder)
* [Example from StackOverFlow](http://stackoverflow.com/questions/14320610/how-to-make-an-api-call-using-meteor)

## Routing

1. Add package

		$ meteor add iron:router

2. Read guide

	[Iron router Guide](http://iron-meteor.github.io/iron-router/)

3. Watch video

	[Building Large Scalable Realtime Applications With Meteor](https://www.youtube.com/watch?v=akWn_WD2cyA)


## Mobile

xcode and Android SDK Platform API 22 (5.5.1) has to be installed manually (because `Cordova` requires that version).

I installed it in the homebrew version of Android SDK tools. The Android SDK manager can be opened with: `/usr/local/Cellar/android-sdk/24.4.1_1/bin/android`, not the one opened via Android Studio/Configurations.

Run on simulators (Android does not work yet.. TODO: try genymotion)

```bash
meteor add-platform ios
meteor run ios

meteor add-platform android
meteor run android
```

Run on device

```bash
meteor run android-device
meteor run ios-device
```

Run on mobile server

```bash
meteor run android-device --mobile-server my_app_name.meteor.com
meteor run ios-device --mobile-server my_app_name.meteor.com
```

These commands are not needed anymore:

	meteor install-sdk ios
	meteor install-sdk android

## User accounts

1. Add user-accounts functionality

		meteor add accounts-ui accounts-password
		// or
		meteor add accounts-ui accounts-facebook
		meteor add accounts-ui accounts-google
		meteor add accounts-ui accounts-twitter

2. Wrap a Blaze component in React

	```js
	AccountsUIWrapper = React.createClass({
	  componentDidMount() {
	    // Use Meteor Blaze to render login buttons
	    this.view = Blaze.render(Template.loginButtons,
	      React.findDOMNode(this.refs.container));
	  },
	  componentWillUnmount() {
	    // Clean up Blaze view
	    Blaze.remove(this.view);
	  },
	  render() {
	    // Just render a placeholder container that will be filled in
	    return <span ref="container" />;
	  }
	});
	```


## Meteor Add-Ons

* [Animations](https://github.com/webtempest/meteor-animate)
	`meteor add webtempest:animate`
* [Bootstrap](https://atmospherejs.com/mrt/bootstrap-3)
	`meteor add mrt:bootstrap-3`


#### meteor

Video (14:16) updateNodes Method with either insert or update..

Hybrid approach - transient collection + database

Meteor uses DDP protocol