---
title: 'Redux Setup'
description: 'How to setup your React or React Native app to use redux. Also showing a special case with the use of Immutable.js'
date: '2016-03-20T12:20:00.169Z'
category: 'framework'
tags: ['javascript', 'react', 'redux']
---

## React

### `index.js` in `src` folder

Create the store:

```js
import { createStore } from 'redux';

const store = createStore(reducer);
```

Initialize the store:

```js
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={ store } >
    <App />
  </Provider>,
  document.getElementById('root')
);
```

Within the `<Provider \>` tags, `<Router \>` tags from `react render` might be included to set up site rendering.

```js
<Provider store={ store } >
  <Router routes={routes} />
</Provider>,
```

where `routes` includes a file with all routes.

### `index.html`

```html
<body>
    <div id='root'>
    </div>
    <script src="/static/bundle.js"></script>
  </body>
```

## React-Native

In `store/configureStore.js`:

```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducer from '../reducers';


export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      devTools()
    )
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
```

### Own implementation of `mapDispatchToProps` to work together with `Immutable.js`:

```js
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';

/**
 * maps passed actions to props and bind dispatch
 * @param {array} actions - actions
 * @return {function} function to be passed to connect
 */
export function mapDispatchToProps(actions = []) {
  return (dispatch) => {
    let creators = Array.isArray(actions) ? actions : [actions];

    creators = new Map()
      .merge(...creators)
      .filter(value => typeof value === 'function') // only pass functions
      .toObject();  // convert immutable object to standard JS object

    creators = bindActionCreators(creators, dispatch);

    return creators;
  };
}
```
