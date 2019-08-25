---
title: 'Flow Typechecker'
description: 'Concepts, syntax and code snippets for React, covering the topics state, props, components, the component life cycle, refs, JSX, mixins and a manual React setup'
date: '2017-06-07T17:58:32.169Z'
category: 'framework'
tags: ['javascript', 'types']
---

* [Exact object types](https://flow.org/en/docs/types/objects/#toc-exact-object-types)

	```js
	// @flow
	var foo: {| foo: string |} = { foo: "Hello", bar: "World!" }; // Error!
	```

* [Immutable Map Type Definition](https://github.com/facebook/immutable-js/blob/master/type-definitions/immutable.js.flow#L685)

	A Map with a key of type string and another Map as value, where the Map as value has again a string as key and the value can have any type. Now when you are asking, I am not sure where I saw the `*` to use for any...

	```js
	const selectLibraryContainerDomain = () => (
		state: Map<string, Map<string, *>>,
		=> state.get('library');
	```

* Suppress flow error on specific line

	```js
	// $FlowFixMe
	const hello = "This will not throw a flow error!";
	```

	in *JSX* e.g.:

	```js
	{/* $FlowFixMe */}
	<LoginContent {...props} />
	```

* Basic saga exists test

	```js
	describe('PreviewPage/sagas', () => {
	  it('should have sagas', () => {
	    sagas.map(saga => expect(saga.constructor.name).toBe('GeneratorFunction'));
       });
     });
     ...
	```

### React

* React Elements

	```js
	type Props = React.ElementProps<typeof SectionList>;`
	```