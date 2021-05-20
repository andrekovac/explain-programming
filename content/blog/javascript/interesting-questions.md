---
title: 'Javascript - Interesting questions'
description: 'Concepts, syntax and code snippets of interesting and cool stuff you can do with Javascript'
date: '2019-08-20T23:46:37.121Z'
author: 'André Kovac'
category: 'programming-language'
tags: ['javascript', 'react-native', 'react']
draft: false
ready: true
---

## React Native App

NEW QUESTIONS

1.  APP: In `components/LaunchScreenBackdrop/styles.js`: Why is undefined used here?

        	```
        	image: {

    flex: 1,
    width: undefined,
    height: undefined,
    },
    ```

2.  APP: In `src/common/localstorage/LocalStore.js`: Why do you create instances as static members within their own class and not outside of that class? Below defining the class you're exporting them anyway..

---

26. `Proxipedia Mobile App`: Explain performance optimization of `_prepareDataSource` in `PoiGrid` and `_dataSource(props)` in `PoiDetail.js`.

    - Das sagt der Liste: "Nimm bitte `itemsIds` als keys."
    - Hier wird jetzt mit `itemIds` eine custom Id liste cloneWithRows mitgegeben: `return ds.cloneWithRows(itemsMap, itemsIds);`. Defaultmäßig benutzt cloneWithRows die indices als id's.

    - `rowHasChanged` wird zunächst aufgerufen. Mit normalen indices würde der hier feststellen, dass sich nach Beacon-Sorting alle indices-Objekt Verbindungen anders sind und nun die einzelnen Items der Liste neu gerendert werden müssen. Mit
    - In die `dataSource` Geschichte der React List Komponente schauen, um das alles besser zu verstehen, was React da under the hood macht.

    - Die Zeile `if (maxItems) m = Math.min(items.length, maxItems);` mit `maxItems` ist eine Peformance Optimierung im Zusammenhang mit dem Placeholder-mode.

    ##### Andere Idee in der Liste: `Placeholder-mode`

    - Rendere bis alle Animationen vorbei sind nur die ersten paar Items (hier wurden drei Stück gewählt, weil sie einen ganzen App Screen füllen) und erst danach noch den Rest. Der User merkt nichts und die Performance ist besser.

1. Time: Explain syntax of `return +(new Date());` in `artirigo-library/lib/util/time/now.js`. Why `nowMethod()`?

   **Answer**: `+()` ist ein integer cast erzeugt hier aus Date timestamp

1. Was hat es mit `scripts/test/mocks` auf sich?

   - Ein paar modules müssen in Tests gemockt werden, damit die Tests noch funktionieren.
   - Use babel for `nodeModulesBabel` in `scripts/test/compile.js`. Hier werden die tests, die ES6 drin haben mit Babel compiliert.

1. Explain the whole version management please. Running `code-push` Android without `--targetBinaryVersion` flag gives error `[Error] No property named "getVersionName()" exists in the "android/gradle.properties" file.`

   **Answer**: Wir geben Version nummer erst beim builden mit **Fastlane** mit und nicht direkt im Android code. Mit `--targetBinaryVersion` geben wir die Version also explizit schon beim code-push Befehl an und er versucht nicht die Android Versions-Nummer aus den gradle files rauszulesen.

---

20. In `scripts/flavor-copy.js`, warum `.then((data) => { i18nFlavor = data; })`?

28) What's going on here in `POIGrid.js`?

        reactMixin(PoiGrid.prototype, TimerMixin);

29) Warum wird `_prepareDataSource(items, maxItems) {` in `PoiGrid.js` zweimal aufgerufen und `console.log('itemsMap', itemsMap); console.log('itemsIds', itemsIds);` liefert unterschiedliche Ergebnisse?

34. What does happen here in `Api.js`?

    ```js
    // if no contentVersion is in the result but we got data
    // we can savely say, that's it's the current version
    // otherwise it would return an error
    responseJson.contentVersion = this._contentVersion;
    ```

35. Was macht `export const navigation = false;` in `PoiDetailContainer`?

36. In `comonents/Audio.js`:

    1.  Why did you define the methods as `static`?

        **Answer?**: So that you can call it without having to get hold of the Audio instance?

    2.  Follow up question: How would you get hold of the particular Audio instance?

        **Answer?**: Via a `ref` which is stored in the state?

    3.  in static function `load`: Why do you have to `// replace file-protocol`?

37. In `artirigo library`:

    1.  What does `ConditionalRender` component do?
    2.  How does `_computeSyntheticState` in `Button.js` improve performance?

---

## TODO in `Proxipedia Mobile App`:

- Investigate `measure` in `LightBoxTrigger.js`:

      		this._root.measure((x, y, width, height, pageX, pageY) => {

      	- when rendered, I get size of view. part of every view.
      	- But how does the whole thing work here?

- Test 2 modals at the same time!!! Just dispatch an alert directly after the gallery or so..

- Refactor `text` to `story` in action.

- Check out how `progressCallback` in `Api.js/upload` works.
- Play around with and understand the video-player rotation transform animation! and how the `Animated.View` lives inside the `Video` component.
- Check out swipe up animation --> Header disappearing.

      	--> Investigate `PoiDetailNavHeader` in `PoiDetail.js`.

- How did you solve Android fetch finally work with form data?
- Pointer events... difference?
- Understand the routing and how it works together with actions/redux state
- Understand Animations! --> Play around with animation values in simulator \w hot reloading.
- How to rename a RN project. --> Try it again.

- Testflight --> upload build
- Codepushify an app
- Fully understand this code (i.e. from `Animated` class), i.e. what does the `?` do? It should mean optional. But just check:

      	```js
      	type TimingAnimationConfig =  AnimationConfig & {
      	  toValue: number | AnimatedValue | {x: number, y: number} | AnimatedValueXY;
      	  easing?: (value: number) => number;
      	  duration?: number;
      	  delay?: number;
      	};
      	```

      	**Partial Answer**: Introducing strict typing into JS

      	I think that's the FlowType syntax!

      	**TODO**: What does the question mark exactly stand for?

      	and

      	```js
      	var timing = function(
      	  value: AnimatedValue | AnimatedValueXY,
      	  config: TimingAnimationConfig,
      	): CompositeAnimation {
      	  return maybeVectorAnim(value, config, timing) || {
      	    start: ...,
      	    stop: ...,
      	  };
      	};
      	```

- Understand this code from `scripts/flavor-copy.js`:

      	```js
      	  fs.readdir(flavorI18nDir, (err, items) => {
      	    // folder exists
      	    if (!err) {
      	      //
      	      items.reduce(
      	        (sequence, fileName) => (
      	          sequence.then(() => mergeI18nFiles(fileName))
      	        ),
      	        Promise.resolve()
      	      ).then(() => next());
      	    } else {
      	      next();
      	    }
      	  });
      	```

      	**Partial Answer**: Ingenious use of `array.prototype.reduce`! Creates a `Promise chain` by starting with `Promise.resolve()` and adding `.then()` calls along the way!

      	**Still TODO**: Fully understand the `next()`!

- Go through all `ListView` properties in `PoiGrid`.
- Finish test function with `bind()` + additional new input

- In `actions/push_notifications.js` I had to write:

      	```js
      	PushNotificationIOS.addEventListener('notification',
          (notification) => onPushNotification(notification, dispatch));
      	```

      	because the following led to the error that `dispatch` is not a function

      	```js
      	PushNotificationIOS.addEventListener('notification', onPushNotification);
      	```

      	Why does `onPushNotification` not have access to `dispatch` here?

      	**Maybe Answer??** ----> Because `dispatch` function is not declared in that scope. Instead of `onPushNotification` try `() => onPushNotification`. ???

44. Selectors:

    in `react-boilerplate`: In `containers/HomePage/selectors.js` `selectHome` expects the entire `state`. But the line `(homeState) => homeState.get('username')` expects the `homeState` which is on a deeper level. Then later in `HomePage/index.js` it is called in

    ```js
    const mapStateToProps = createStructuredSelector({
      repos: selectRepos(),
      username: selectUsername(),
      loading: selectLoading(),
      error: selectError(),
    });
    ```

    and here all is on the same level as the other selectors? But don't they expect different levels of the store??

- PP1.5 App: How does `fullscreenToggl` work?

- PP1.5 App: Understand `_getContent` in `LightBoxTrigger.js`:

      	```js
      	  _getContent = () => {
      	    const {
      	      children,
      	      activeProps,
      	    } = this.props;

      	    if (activeProps) {
      	      return cloneElement(
      	        Children.only(children),
      	        activeProps
      	      );
      	    }

      	    // use children as they are
      	    return children;
      	  };
      	```

      	**Answer**: `cloneElement` merges `activeProps` with the own props of the single child (see [React docs](https://facebook.github.io/react/docs/top-level-api.html#react.children))

      	i.e. just some additional props are passed to the child if it is active.

## Questions of CMS React Frontend

4. Can you explain this in `ContentContainer.js` styles:

   ```css
   .mainScroll {
     flex: 1;
     overflow-y: scroll; /* has to be scroll, not auto */
     -webkit-overflow-scrolling: touch;
   }
   ```

   **ANSWER** Verhalten wie am Telefon -- runterziehen

   In same file, `right: auto` doesn't seem to have any function, or does it?:

   ```css
   .drawerSeperator {
     composes: seperatorLeft absoluteFill;
     right: auto;
   }
   ```

   **ANSWER** Take width instead of `right:0` which comes from `absoluteFill`.

6) Why does this in `.mediaLibrary__items` hinder the text to overflow?

   ```css
   .absoluteFill {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
   }
   ```

   Ganzer screen.

1) In `MediaLibrary` Component styles:

   ```css
   .btnClose {
     position: absolute !important;
     transform: translate(0, -50%) !important;
     display: block;
     right: 0;
     top: 50%;
   }
   ```

   - `margin-top: -30px` in allen browsern.
   - top beziehen sich auf container in dem .btnClose drin ist.
   - transform -50% beziehen sich auf element selbst.

1) Selectors: Why are they wrapped in a function? e.g. (In the example in the boilerplate docs they are not wrapped)

   ```js
   const selectRepos = () =>
     createSelector(selectGlobal(), (globalState) =>
       globalState.getIn(['userData', 'repositories'])
     );
   ```

   - If you use a function it creates a new selector each time.
   - With `props` it makes sense to wrap it in a function.

   - Also in `HomePage/selectors.js`: Why is selectHome again wrapped into an _empty_ function, if it is directly called thereafter in `selectUsername` ??

1) In `redirectToLogin` hook and in homePath logic in `routes.js`:

   Why is it `!isAuthenticated` and not `isAuthenticated` in `if (!isAuthenticated) replace(RouteId.home);`?

   Shouldn't it only go to home if a user is authenticated??

   Or does it mean, if a user is not authenticated, go to home which will be redirected to login, but there the logic is also inversed in my sense...

1) In `app/app.js`, how does this `Promise` work?

   ```js
   let storeReady;
   const storeReadyPromise = new Promise((resolve) => {
     storeReady = resolve;
   });
   ```

   **ANSWER** Speicher storyReadypromise resolve funktion.

1) Was macht diese Zeile anderes als `{children}` z.B. in `Contentcontainer/index.js`?

   ```js
   Children.map(children, (child) => child);
   ```

   Spuckst du hier z.B. die `li` elemente einer `ul` aus?

1) In `MultiLocaleContent/index.js`

   Warum werden hier nicht auch der Inhalt von `ObjectPage/index.js` gerendert?

   ```js
   {
     cloneElement(Children.only(children), {
       locale: item.locale,
       isDefaultLocale: item.locale === defaultLocale,
       data: item,
     });
   }
   ```

   Einfach Property `children` --> die wird bearbeitet.

1) How to understand this?

   ```js
   defaultMessage: '{data, plural, \n=0 {Draft}\n=1 {Published}}',
   ```

   - `\n` wegen JSLint um neue Zeile darzustellen.
   - [format.js](http://formatjs.io/guides/message-syntax/#plural-format)

1) Zum `redux-persist`. Wie genau funktioniert das? Sucht das dann automatisch erstmal im Browser, ob da noch etwas abgespeichert ist beim mounten vom redux store?

   --> Redux persist - auch nur laden und speichern.

   - `store.js`
   - in debugger in `Application` -> `Local Storage`

---

- CSS modules variables don't

---

## General

1. In React the life-cycle methods may be called as:

   ```js
   componentWillMount() { ... }
   ```

   This is not a function call `componentWillMount({ ... })` or a function declaration `function componentWillMount() { ... }` or a function expression `const componentWillMount = function() { ... }`

   What is it? - Is this a prototype method call? Or a ES6 JS **method** call?

   **Answer**: It is syntactic sugar for a `method definition` ([see these docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)) --> See my JS theory document about ES6 classes.

2) If both, a function expression and a method definition, occur within the same class, what's the difference? I.e. what's the role of the function expression here?

   **Answer**: Martin uses function expressions often because of the ES6 binding feature.

## Answered:

2. Why is `fetchData` defined as a class **method** in most classes and not as a function expression as most of the other functions? Because it is called in `componentDidMount`?

   **Answer**: To make use of ES6 binding feature of function expressions.

3. Why are these two lines the same? Explain semi-colon:

   ```js
   onChange={event => this._handleChange(event.target.name, event.target.value)}
   onChange={({ target: { value } }) => this._handleChange('desc', value)}
   ```

   **Answer**: Using ES6 `destructuring`!

4. Investigate: How does `classNames` from `import classNames from 'classnames';` work?

   **Answer**: Dynamically add `classnames` based on boolean expressions.

5. In `ObjectPage/reducer.js`:

   Why is this better than creating new `ObjectLocalizedState`?

   ```js
   object = ObjectLocalizedState.fromJS({
     id: action.id,
     objectId: action.objectId,
     locale: action.locale,
   });
   ```

   **ANSWER**: Found the answer: `fromJS` is a custom field defined in the file `records.js` in which `ObjectLocalizedState` is defined. `fromJS` includes the call of `new ObjectLocalizedState`.

6. PROMISES: In `api/index.js`:

   ```js
   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
   ```

   ```js
   cosnt delay = (ms) => (
     new Promise(function(resolve) { return setTimeout(resolve, ms) })
   );
   ```

   Why set the `resolve` Promise as argument for `setTimeout`?

   **Answer**: It's the callback of setTimeout!! After the timeout finishes, just resolve the Promise - no more needs to be done here!

7. Where does prop `location` come from? i.e. how is passed to the containers from the router?

   **Answer**: From react-router or from the window.location object.

---

# OLD QUESTIONS

# Javascript Questions

### New

1.  First-class functions

    in book `most-adequate-guide` to functional programming, he never uses the arguments in the first-class functions examples. E.g. he says the following two examples are equivalent (page 38):

    ```js
    “// go back to every httpGet call in the application and explicitly pass err
    // along.
    httpGet('/post/2', function(json, err) {
      return renderPost(json, err);
    });
    ```

    ```js
    // renderPost is called from within httpGet with however many arguments it wants
    httpGet('/post/2', renderPost);”
    ```

    Where did the arguments `json` and `err` go?

2.  Redux

    - e.g in `POIDetailContainer.js`, what are the `ownProps`?

          	props passed to container, e.g. `navigationState` from `App.js`

    - What are `navigationState`?

          	e.g. see `container/App.js`:

          	```js
          	const RouteComponent = Routes[props.scene.navigationState.key].component;
          	<RouteComponent
          key={props.scene.navigationState.key}
          navigationState={props.scene.navigationState}

      />
      ```

          	`naviationState` prop, um poi id mitzugeben.

          	--> NavigationExperimental anschauen --> actions/naviagation

    - In `Exhibition.js`: `ownProps.navigationState.id` is the root poi.. why?

    ---> NavigationExperimental anschauen --> actions/navigation

    - what does the `.reduce((result, group)` function do? Is it from redux? e.g. `header: header.reduce(mediaReduce, []),` or

          	reduce function

    in `lodash` there is a reduce function. But now it is called on e.g. `poi.layout.body` directly, i.e. `poi.layout.body.reduce()`

    --> reduce function is part of core Javascript

3.  Proxipedia

    - Where does the prop `style` come from in `ListItemImage.js`? It's not set as prop in `DetailView` when it is called.

    --> it is not required. style **_can_** be set if needed.

4.  Proxipedia: In `NavigationList.js`, where does the parameter `scrollProps` come from in:

        	```js
        	renderScrollComponent={(scrollProps) => (
         <ScrollView {...scrollProps}
           alwaysBounceVertical={false}
         />

    )}
    ```

        	from `<ListView/>`

5.  Proxipedia: How is a detail, i.e. `NavigationDetail` rendered in `Navigation.js`?

    Configuration in `navigation/index.js` --> mapping to Components in `Navigation.js`

6.  Proxipedia: What's the `modalState` in e.g. `App.js`?

    check out `modalPush` and `modalPop` --> look at redux state

7.  Proxipedia: `<LightBox />` is rendered in `App.js`. How is the Lightbox called from `LightBoxTrigger`?

    `if (!isOpen) return null;

    {modalState.isOpen ? <LightBox {...modalState}\> : null`

8.  in `src/common/localstorage/index.js`

    - `export default new Local(schema);` is exported. Well, which `schema` will that be?

          	--> Not in the app anymore. Check out `realm`

    - so `Realm` exposes an object `realmSchema` to the file in which it is imported?

9.  How does the following export of common button styles function work?


    --> caching mechanism. Args are saved.

    ```js
    export const styles = (...args) => {
      const argsString = args.join(',') || 'DEFAULT';

      // no stylesheet created for this setting -> create
      if (!map[argsString]) {
        map[argsString] = StyleSheet.create(stylesSrc.apply(this, args));
      }

      return map[argsString];
    };
    ```

7. Why do I need `export { default } from './ComponentName';` inside each `index.js` additionally to `export * from './ComponentName';`?

   with \* only named exports are exported, not default.

8. In `Waypoint.styles.js`, where is `styles.footerText` defined?

   ```js
   export default {
     ...styles,
     footerText: [globalStyles.smallCopy, styles.footerText],
   };
   ```

   --> not on purpose.. probably a copy-paste error

9. How does `util/time/now.js` work?

   `+(new Date())` : cast into number --> creates unix timestamp

10. Default values for props are now set in `defaultProps` and not in `constructor` anymore..

    Why is `MyComponent.defaultProps` the same as `static defaultProps` ??

11. How does storage work?

    --> look at `util/fs` files

12. in `ListItemVideo.js`:

    ```js
    {
      description && '\n';
    }
    <Text style={[textStyles.smallCopy]}>{description}</Text>;
    ```

    Um die Lehrzeile hinzuadden wenn es eine description gibt.
    Gibt den letzten Wert aus wenn er True ist.

13. According to React documentation `this.props.children` can be either an array or an object if there's only one single child. Is `{this.props.children}` robust against that?

    ???

14. In `LightBoxTrigger.js`:

    What does `Children.only(children)` do and why do we need it here?

    ```js
    if (activeProps) {
      return cloneElement(Children.only(children), activeProps);
    }
    ```

    Probably check whether only one child in children.

15. `measure` function in `LightBoxTrigger.js`:

    What does this function do?

    ```js
    this.refs.root.measure(
    ```

    when rendered, I get size of view. part of every view.

16. Navigation e.g. `container/Home.js`. What do functions `right` and `left` do?

    See `App.js` --> render whatever is in right or left part.

17. What does the action `navigateReset()` do?

    resets the navigation.

18. How is `modalState` in `App.js` connected to `modalStateReducer`?

    ES6 syntax shortcut let's it appear so, but via default export it works.

20. How could I get information about the current POI inside an action creator which I build like `actions/menu.js`? i.e. `story.js` in commit `bcfb7f86e2ed4c21435353dd1821c2838668ef82`

21. Why start with return statement within action creator with `Promise.resolve()`?

    ```js
    return (
      Promise.resolve()
        // TODO determine which languages to load
        .then(() => api.languages())
    );
    ```

    --> because Martin thinks it looks nicer!

22. Javascript Closures - debounce

    --> read article

23. How to create a flavor?

    Discussed + instructions created

---

#### Some new questions (June 21 ff)

24. Webstorm: Is it okay to deactivate the `Babel` file watcher in our projects. We're using the 'react-native' thing.

    --> Mal gucken wenns nochmal kommt..

25. Can redux async actions be passed to stateless Component from Container via mapDispatchToProps?

    YES! It can!

    My comment: We just pass `dispatch` method and then import the action inside the component to then call `dispatch(someAction)`. Is this the only way to do it?

26. Why do you use the `XMLHttpRequest();` in the `upload` function in `Api.js` and not `fetch`?

    `fetch` hat keinen `onprogress` callback to show progress.

27. Why did you create an Api **class**?

    - Initialization + ..perhaps easier to make it more generic
    - As an instance I am more flexible.. can create second api class instance with e.g. other parameters. (~Singleton implementieren)

28. Error when running `npm run debug:android` with Genymotion:

        Starting the app on 192.168.58.101:5555 (/usr/local/opt/android-sdk/platform-tools/adb -s 192.168.58.101:5555 shell am start -n de.artirigo.whazat/.MainActivity)...
        Starting: Intent { cmp=de.artirigo.whazat/.MainActivity }
        Error type 3
        Error: Activity class {de.artirigo.whazat/de.artirigo.whazat.MainActivity} does not exist.

    --> Manually start app

29. In `CameraActionContainer`, why don't you define the following `onAction` as a redux thunk?:

        onAction: (...args) => (
          Promise.resolve()
            .then(() => dispatch(upload(...args)))
            .then(() => dispatch(feedResetTimestamp()))
            .then(() => dispatch(navigatePop()))
        ),

    These actions calls together only appear here together and they all are from different actioncreator files.

30. In `FeedItem.js`, warum sollte es in der folgenden Zeile jemals kein `onImage` geben? Wird doch immer weitergegeben..

        const ContainerComponent = onImage ? TouchableOpacity : View;

    Wahrscheinlich wirft `onImage: () => {},` hier `false`. This is set in parent component `Feed` as default-props.

    If I don't pass the `onImage` property it will be false.

31. In `NavigationStateUtils.js` of `NavigationExperimental`: Do you know why in the `pop` function in `index: lastChildren.length - 2,` the index is reduced by 2?

    one child: index = 0, two children: index = 1.

32. Navigation: How is the correct image accessed?

    `navigatePush` and the corresponding reducer don't handle the `id` which is the image ID..

        const onImage = (imageId) => navigatePush({
          key: RouteId.Detail,
          id: imageId,
        });

    In `DetailScreenContainer.js`: `const imageId = ownProps.route.id;` . The content of DetailScreen is set like this.

33. In general: What is the difference between `push` and `jumpToIndex` in routing? Why do I need the later anyway?

    we use `navigateReset` to reset the stack.
    e.g. `Favorites` becomes index 0 when clicking Favorites from Home in Proxipedia 1.5

34. In constructor of React class: `this.state = { ... }` vs. `state = { ... }`? The same? Why can I actually call `this.state` in a stateless component??

    `state` is an instance variable.
    --> Try: setState() sollte in stateless component nicht funktionieren...

35. Explain syntax of stateless component. It is not a class, so it does not need a constructor for props.. But how does it work?

    - Like only having the render function.
    - Be aware: entire stateless component is executed when rerendering.
    - No refs are possible in stateless components

36. Javascript: Two different ways of defining properties of objects which are then called with the dot `.` operator: `someArray.length` vs. e.g. `Animated.timing(...).start()`:

    - `length` is defined as: `Array.prototype.length = 0;` in `EcmaScript.js`. (and all other functions of array like e.g. `toString`)
    - `start()` inside `Animated.js` is basically defined as `timing = () => ({ start: () => {...} })`

    What's the difference?

38) In component `CameraAction.js`: What is a React mixin? How does the `_mixinFrameStyle()` thing work?

        this.setState(this._mixinFrameStyle({
        	currentAction: ACTIONS.CAMERA,
        }));

    Answer:

    - A mixin mixes something to the response, i.e. here the `_mixinFrameStyle()` mixes the orientation which is stored in an instance variable `_lastOrientation` (received from an event listener callback) into the store during the `setState` command.
    - A mixin was created here because this setting of orientation in the state is used at several places.
    - Mixins can be chained, one for each functionality.
    - If the orientation were just written in the state here, the orientation frame would also change if we are in the child component `PhotoDecide` in which we don't want the frame to change. When going back to the camera from here, we again want the frame to change, so the mixin is called here, when the state is set.

    Is this just squeezing a thing to do directly before setting the state in `setState` given some variable, right?

39) How do you update a new version patch version of `artirigo-library`?

    Just increase version number in `package.json` in new commit.

#### Newest questions (14.07. ff)

2. `scripts/flavor.js` - Explain `async.series` and `workplan`.

   Call the script with `node --harmony scripts/flavor.js`

   Or call as `npm run flavor -- --flavor-name='test'`

3. Ask about commit: `40c6077` use ItemMap instead of Array for PoiGrid-ListView to avoid unnecessary rerenders

4. Ask about commit: `ba23665` beacons noise filtering

5. Ask about commit: `87cca3e` update proxipedia launch-screens and icons

6. Ask about commit: `48bbb8e` enable LayoutAnimation on android

7. Ask about commit: `de2ab7b` PA-113: display real download progress via file size from server -

8. Ask about commit: `7f6fab7` PA-154: display bundle size in 'download' button

9. Ask about commit: `949ae9a` fastlane: add android release lane

10. Ask about commit: `a51b5a2` add ResponsiveImage Component

11. Ask about commit: `1a7129a` add react-addons-shallow-compare, style-equal plugins

12. Ask about commit: `202696d` PA-301: PoiDetail placeholder state and `826f773` PA-301: PoiGrid placeholder state - Martin Rädlinger

13. What is the `sinon` package and where do we use it?

14. Learn from mistakes: What is bad about the CMS front-end code?

15. Resize gallery image on drag --> Where is it implemented?

16. flow?

17. react native cli --> generator . What are generators?

30) Ist die story box keine `Lightbox` mehr?

    --> Doch! Siehe die nächste Antwort.

31) Wo called `LightboxTrigger` die `Lightbox`?\

    --> über `props.onOpen` welches nach oben propagiert die `modalOpen` action auslöst. Diese wiederum hat Einfluss auf den `ModalStack` und der zeigt die `Lightbox`.

32) **Fastlane**:

    - In `platform:ios`, `private_lane :build_app` was ist die `case options[:publish] == 'device'`?

          	* --> Build on device to show others.

    - Wie ruft `apply_flavor` `scripts/flavor` und `scripts/flavor_copy` auf? \* --> FOUND IT: In `fastlane/actions/apply_flavor.rb`

          	* In der lane `alpha` gibt es `config = load_flavor(options)` --> Wo ist der output von `load_flavor()` festgesetzt?

    - Wo wird `PROXIPEDIA_APP_CONFIG` gesetzt? Was ist das?

33) What do the npm scripts `bundle:ios` and `bundle:android` do?

    --> Old scripts to bundle the code --> Now done by `fastlane` and in `Jenkins`

34) Why do `deploy:ios` and `deploy:android` work as `fastlane ios` and `fastlane android`?

    --> Probably defaults

35) `PP 1.5 App` - State is initialized as a `Map` in `poisReducer.js`. So why can you then merge it with a `Seq`? Why don't you initialize it as a `Seq` in the first place?

    ```js
    case BUNDLE_UPDATE_DATA:
      return state.mergeDeep(
        new Seq(action.data.pois)
          .map((value) => new PoiState(value))
          .toMap()
      );
    ```

    --> Because `Seq` is only temporarily... it's a map here, because order doesn't matter!

36) Was machen die zwei Anführungszeichen in `return !!dispatch(navigatePopIfNotHome());` in `App.js`?

    - This is the `Bang operator` --> Makes it a boolean!
    - **Am I right that..** here the action is dispatched and then the boolean is returned of what dispatch returns. What does

---

#### Answered on 2016/09/09

39. In your 1.5 App scripts (and also in the react boilerplate) why do you use `require('package_name')` but also ES6 syntax arrow-style syntax and don't use `import` which babel can translate to `require`?

    - `node --harmony` unterstuetzt einige ES6 features aber noch nicht `import` und `export`.

    - `babel-node` würde das `.babelrc` welches wir fuer React eingestellt haben, benutzen.

40. How do I delete the `webpack` cached offline files in Chrome Dev Tools?

    - DevTools/Application/Clear Storage

41. Why do we have this in the reducers?

    Falls vom Server z.B. ein State in nicht immutable form reinkommt..

    ```js
    if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
    ```

---

37. Do callback functions always have to be wrapped inside an empty function? e.g.

    ```js
    // --file.js--
    function getJSON(url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        callback(this.responseText);
      };
      xhr.open('GET', url, true);
      xhr.send();
    }

    export function getUsefulContents(url, callback) {
      getJSON(url, (data) => callback(JSON.parse(data)));
    }
    ```

    ```js
    // --main.js--
    import { getUsefulContents } from 'file';
    getUsefulContents('http://www.example.com', (data) => {
      doSomethingUseful(data);
    });
    ```

    --> I don't think so... Look at it more closely!

---

## Asked (most of)

2. `export default` and `export` in one file

   e.g.

   ```js
   export default Icon;
   export { glyphMap };
   ```

   Set the default export if nothing is specified and then the other exports.

3. Does `export * from './crud';` export everything from all subfolders in `./crud`?

   No, it does not. `index.js` in folder is exception. If an `index.js` file exists,

4. Why does this tell me whether the item is immutable? in `crud/index.js`?

   ```js
   export const isImmutable = (item) => typeof item.toJS === 'function';
   ```

   --> Because that's the way an immutable.js object is defined. An immutableJS object has a `toJS` property which is of type `function`. Of course this test is not completely robust, but good enough in this scenario.

### React Redux

1. In `connect`, i.e `mapDispatchToProps` in a container, what is the difference between `state => state` and `state => ({})`?

   - this components state (subset of the redux store) is available as props.
   - no fields from the current state will be available as props.

2. Wenn `connect` so gerufen wird, ist es dann das gleiche, wie einfach ohne connect, sprich `export default App`?:

   ```js
   export default connect((state) => state)(App);
   ```

   No! Because connect makes redux features, i.e. dispatch method and custom actionCreators and the redux state have to be made available in the container.

   So the dispatch method or a method

   **Pure function** --> has a reference to the store in it.

   Idea of redux --> move dispatch with a reference to the store around.

   default of mapDispatchToProps: `dispatch => dispatch` (i.e. make the `dispatch` function available as props.

   As pseudo-code:

   ```js
   (dispatch) => {
     dispatch,
       bindActionCreators(myActionCreator),
       bindActionCreators(myActionCreator2);
   };
   ```

3. Martin, how do you use the tool `https://github.com/wix/wml` when creating a RN plugin?

   I know how!

### React

in

```js
const { navigationState, modalState, global: globalProps } = this.props;
```

```js
  state => ({
    modalState: state.modalState,
    navigationState: state.navigationState,
    global: state.global.toJS(),
  }),
```

but called as `props.scene.navigationState.key`

##### Answer:

Because it happens in functions like `_renderScene(props) { ...` where a parameter `props` is passed. It is not `this.props`. `this.props` will have the field `this.props.nagivationState`.

### Proxipedia

1. `Icon.js` does not process `props.name`, but in `ButtonIcon.js` it is used as `<Icon name={icon} />`

   Callback function in Javascript. You have to check the definition of the `Item` package.

2. How much do we use immutable objects/arrays in the app, e.g. `pois.toJS()` in `Home.js` container?

   In reducers we work with javascript objects
   Redux store is immutable
   e.g. see util/redux/crud

   changing immutability happens in `reducers` + in `connect`, i.e. mapStateToProps

3. What does `import { shallow } from 'enzyme';` the `shallow` function do?

   `shallow` creates a React component.

   --> write some tests

4) Where are the callbacks specified?

   e.g. in `PoiDetail.js` in render function a prop of `<Listview \>`:

   ```js
   renderSectionHeader={this._renderSectionHeader}
   ```

   and in the same file the function is defined as:

   ```js
   _renderSectionHeader = (data, section) => (
     <View style={styles.sectionHeader}>
       <Text style={styles.sectionHeaderText}>{section}</Text>
     </View>
   );
   ```

   Where does `_renderSectionHeader` get its parameter values from? The same with `_renderRow`. It gets the media from somewhere, but from where?

   ###### Answer

   It is defined. The function `renderSectionHeader` expects a callback with parameters `(sectionData, sectionID)`, i.e. see [React Native Documentation](https://facebook.github.io/react-native/docs/listview.html):

   > renderSectionHeader function

   > (sectionData, sectionID) => renderable

   > If provided, a sticky header is rendered for this section. The sticky behavior means that it will scroll with the content at the top of the section until it reaches the top of the screen, at which point it will stick to the top until it is pushed off the screen by the next section header.

   ---

   See redux docs for more infos

## Open questions

1. When is favourites index `-1`? see `favoritesReducer`.

2. What is `util/react/coalesceNonElementChildren.js`?

   --> Martin

3. What does `_computeSyntheticState` in `components/Button/Button.js` do?

   --> Martin

4. TODO: In `PoiDetail.js`, who sends `event` which is present in `_renderStory()`?

   It must be `onOpen` in `ListItemStory`. So is `event` just part of the generic `Component`?

6)  `ModalStack.js` is not visible initially -->

    ```js
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    ```

7)  TODO: in `BundleLoaderContainer.js` investigate `mergeProps`, i.e.

        	what's the difference between `stateProps`, `dispatchProps` and `ownProps`?

        	```js
        	// mergeProps

    (stateProps, dispatchProps, ownProps) => ({
    progress: stateProps.progress,
    show: ownProps.show || stateProps.show,
    })
    ```

8)  How does the following callback stuff work in `TourGrid.js`? `onDetail` calls `onDetail` and where is waypointId sent to `<PoiGrid />` ?

    ```js
    onDetail={(waypointId) => onDetail(waypoints.find((wp) => wp.id === waypointId).poi)}
    ```

### Other

1. Syntax: Why is `my_func() { ... }` equivalent to `my_func: function() { ... }`? Just syntactic sugar?

e.g. in Ember the `model` function here!

```javascript
import Ember from 'ember';

export default Ember.Route.extend({
  /*
  model() {
    let todos = [
      {
        title: "Learn Ember",
        complete: false
      },
      {
        title: "Solve World Hunger",
        complete: false
      }
    ];
    return todos;
  }
});
```
