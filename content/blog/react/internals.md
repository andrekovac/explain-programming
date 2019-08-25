---
title: 'React - Understand <ListView />'
description: 'A look under the hood of the React ListView component'
date: '2019-08-25T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'react', 'internals']
---

**Note**: This documentation refers to an old version of `ListView`. now it is encouraged to use `FlatList`. This document can however be an in interesting read.

---

Let's take a small look at React under the hood

## Understand React-Native ListView

In `react-native/Libraries/CustomComponents/ListView/ListView.js`, we find:

1. `renderRow` should be passed to ListView as `props`:

	```js
	propTypes: {
	    ...ScrollView.propTypes,
	    dataSource: PropTypes.instanceOf(ListViewDataSource).isRequired,
	    renderRow: PropTypes.func.isRequired,
	    ...
	```

2. `renderRow` is a function where `this` is set to `null` and the values


	```js
	...
	var row =
	  <StaticRenderer
	    key={'r_' + comboID}
	    shouldUpdate={!!shouldUpdateRow}
	    render={this.props.renderRow.bind(
	      null,
	      dataSource.getRowData(sectionIdx, rowIdx),
	      sectionID,
	      rowID,
	      this._onRowHighlighted
	    )}
	  />;
	...
	```

	* `StaticRenderer` expects a React element in its `props.render`.

From [React Native ListView docs](https://facebook.github.io/react-native/docs/listview.html):
> `ListView` expects a **renderRow callback** which takes a blob from the data array and *returns a renderable component*.

Here bind works to [curry the function](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals#JavaScript8217s_Bind_Allows_Us_to_Curry_a_Function) `renderRow`.

See this [my JS bin example](http://jsbin.com/tufoso/edit?js,console).

So when calling:


```js
<ListView
  dataSource={this.state.dataSource}
  renderRow={(rowData) => <Text>{rowData}</Text>}
/>
```

here `rowData` is a mere placeholder for its value is set inside the `ListView` implementation via `bind()` with the real data of the row. As we see in the code with `bind()`, we can also call `ListView` like this:

```js
<ListView
  dataSource={this.state.dataSource}
  renderRow={(rowData, sId, rId, highlighted) => highlighted ? (<Text>{rowData} number {rId} in {sId}</Text>) : <Text>Not highlighted</Text>}
/>
```

So we see, the order in which I add the items is important!
As a fifth argument to the function I could finally add something new to the row, e.g.

**TOOD: Verify this!!!**

```js
<ListView
  dataSource={this.state.dataSource}
  renderRow={(rowData, sId, rId, null, someOtherData) => (<Text>{rowData} number {rId} in {sId}, {someOtherData.text}</Text>)}
/>
```

Here the `<ListView />` call in vanilla JS:

```js
"use strict";

React.createElement(ListView, {
  dataSource: undefined.state.dataSource,
  renderRow: function renderRow(rowData) {
    return React.createElement(
      Text,
      null,
      rowData
    );
  }
});
```

see this in [the Babel REPL](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&code=%3CListView%0A%20%20dataSource%3D%7Bthis.state.dataSource%7D%0A%20%20renderRow%3D%7B(rowData)%20%3D%3E%20%3CText%3E%7BrowData%7D%3C%2FText%3E%7D%0A%2F%3E).
