---
title: 'Jest - Unit Tests in Javascript applications'
description: 'Some interesting things about unit testing with Jest'
date: '2016-01-14T11:46:37.121Z'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'test']
---

Interesting examples of tricky things to unit test with the testing framework [Jest](https://facebook.github.io/jest/).

## Mocks

### Mock API calls with `fetch`

Use [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock) to replace all `fetch` API calls with mock calls.

- [Simple mock and assert example](https://github.com/jefflau/jest-fetch-mock#simple-mock-and-assert).

**Example**:

```js
const setupComponent = method =>
    method(
        <HomeWithSearch
            locale={'en_us'}
            allTemplates={TemplateListData}
            onTemplateRowClick={() => {}}
            onTemplateDisabledRowClick={() => {}}
        />
    );


describe('Home Container wrapped in Search HOC', () => {
        beforeEach(() => {
            (fetch as any).resetMocks();
        });

        it('Fetches search tags on mount and renders as expected', () => {
            (fetch as any).mockResponseOnce(
                JSON.stringify([{ id: 1, term: 'UMM' }, { id: 2, term: 'MRI' }])
            );

            setupComponent(shallow);

            // Assert on the times called and arguments given to fetch
            expect((fetch as any).mock.calls.length).toEqual(1);
            expect((fetch as any).mock.calls[0][0]).toEqual(
                'other_company_repo_get_search_term{"locale":"en_us"}'
            );
        });

        it('Matches the snapshot', () => {
            expect(setupComponent(mount).html()).toMatchSnapshot();
        });
    });
```

### Mock an imported module with [manual mocks](https://facebook.github.io/jest/docs/en/manual-mocks.html).

**Examples**:

```js
// Problematic
import { IS_IOS } from 'common/constants/platform';

// Solution
jest.mock('common/constants/platform', () => ({ IS_IOS: false }));
```

```js
// Problematic
import { ModalVideo } from 'components/Modal';

// Workaround
jest.mock('components/Modal', () => ({
  ModalVideo: () => null,
}));
```

```js
// Simple workarounds
jest.mock('components/Audio', () => {});
jest.mock('components/CachedImage', () => jest.fn(() => null));
```

```js
// Another workaround
jest.mock('react-native-sound', () => 'Sound');
```

### Mocking dates

Dates can cause annoying problems.

In case you have such a mock:

```js
{
	valueId: 1,
	reminderId: 1,
	valueType: 'PEF',
	personalBest: 200,
	isCompleted: false,
	timeScheduled: '13:00',
	recordedAt: '2021-08-10T12:00:00.466Z',
},
```

the line `recordedAt: '2021-08-10T12:00:00.466Z',` can cause millisecond missmatches in tests on some machines (not all).

To resolve the issue add the following to your test file:

```js
beforeAll(() => {
  // Set date of "today"
  MockDate.set(new Date('2021-08-17T12:00:00.466Z'));
});

afterAll(() => {
  MockDate.reset();
});
```

## Jest config

```js
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');
global.fetch = require('jest-fetch-mock');

enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(30 * 1000);
```

## Enzyme (use it with Jest)

JavaScript Testing utilities for React

### `shallow`, `render` and `mount`

[Nice, but slightly outdated overview](https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913) of `shallow` vs. `render` vs. `mount`.

- `shallow` vs. `mount`

      	From enzyme version **3** on [lifecycle methods in `shallow` behave like in `mount`](https://github.com/airbnb/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#lifecycle-methods)

      	Sometimes `mount` is needed when wrapping the component in e.g. `intl`. Otherwise only the wrapper would be used.

      	```js
      	import withIntl from 'utils/testing/intl';
      	import CellRenderer from './activeInactiveUsersCellRenderer';
      	const CellRendererMountable = withIntl('en')(CellRenderer);
      	...
      	it(`should return a status-label of type "${labelTypes.none}" when no cell data is passed`, () => {
      	    expect(
      	      mount(<CellRendererMountable />).find(StatusLabel).props().type,
      	    ).toBe(labelTypes.none);

  });

  ```

      	where `withIntl` is as the file at the bottom of this file!
  ```

### `create` ([react-test-renderer](https://reactjs.org/docs/test-renderer.html)) vs. `shallow` (Enzyme)

- `react-test-renderer` can render a React DOM or React Native component without using a _browser_ or the _[jsdom](https://github.com/jsdom/jsdom)_ package.
- `shallow` etc. of Enzyme use _jsdom_ internally.

### [Enzyme Matchers](https://github.com/blainekasten/enzyme-matchers#toincludetexttextstring)

A (sometimes) useful extension of matchers.

## Tipps on useful unit tests and how to test it with Jest

- Test whether local callback function is passed down as prop

      	```js
      	const wrapper = shallow(<ExhibitionGrid header={mockHeader} />);
      	expect(wrapper.find('Grid')).toHaveProperty(
      'renderHeader',
      wrapper._renderHeader,

  );

  ```

  ```

- **Refs**: refs are not resolved when testing with enzyme, so you have to wrap that in a try/catch to not throw an error.

      	```js
      	try {

  this.\_listRef.scrollToOffset({ offset: scrollPosition, animated: false });
  } catch (e) {
  // eslint-disable-line no-empty
  }

  ```

  ```

- Check whether **style** exists

	```js
	const style = { backgroundColor: 'red' };

	const wrapper = shallow(<BundleLoader show={true} />);

	wrapper.setProps({ show: true, style: style });
	expect(wrapper.first().props().style).toEqual(
	expect.arrayContaining([style]),
	);
	```

- `.findWhere()` searches the entire tree of components for something. In **React Native** you can do `.findWhere(n => n.text() === 'some text')`.

      	This example here also shows `jest.fn()` and `simulate('press')`

      	```js
      	it('should execute an onClose callback', () => {
      	    const onClose = jest.fn();
      	    const wrapper = shallow(<BundleLoader show={true} onClose={onClose} />);
      	    wrapper.findWhere(n => n.prop('onPress')).simulate('press');
      	    expect(onClose).toHaveBeenCalled();

  });

  ```

  ```

- Functions may be found by their `name` property:

      	```js
      	const EmptyState = () => null;
      	const renderEmptyState = jest.fn(() => <EmptyState />);
      	...
      	expect(header.find(EmptyState.name).exists()).toEqual(true);
      	```

- A component `MyComponent` may be found by the `node.type()` property

      	Here a sub-component is searched for which has a specific prop.

      	```js
      	const component = (
      <CellRendererMountable inactiveUsers={23} activeUsers={23} />

  );
  expect(
  mount(component).findWhere(node => node.type() === MyComponent && node.props().foo === 'myFooProp')
  ).toHaveLength(1);;

  ```

  ```

- `.dive()` while shallow rendering

      	```js
      	it('should render a progress component and label', () => {
      	    const progress = 0.84115;
      	    const wrapper = shallow(<BundleLoader show={true} progress={progress} />);
      	    expect(wrapper.find('Progress').exists()).toBe(true);
      	    expect(
      	      wrapper
      	        .find('Text')
      	        .dive()
      	        .text(),
      	    ).toEqual(expect.stringContaining('(84%)'));

  });

  ```

  ```

- [`spyOn()`](https://facebook.github.io/jest/docs/en/jest-object.html#jestspyonobject-methodname)

      	> Creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function.

      	Here `spyOn()` is used to check whether the function `_updateContainerStyle` which is contained inside a wrapper instance is called.


    ```js
    it('should update the state when new style prop is passed', () => {
        const style = { backgroundColor: 'red' };
        const wrapper = shallow(<BundleLoader show={true} />);
        const inst = wrapper.instance();
        const spy = jest.spyOn(inst, '_updateContainerStyle');
        expect(wrapper.first().props().style).not.toEqual(
          expect.arrayContaining([style]),
        );

        wrapper.setProps({ show: true, style: style });
        expect(wrapper.first().props().style).toEqual(
          expect.arrayContaining([style]),
        );
        expect(spy).toHaveBeenCalledTimes(1);

        // do not update when style is the same
        wrapper.setProps({ show: true, style: style });
        expect(spy).toHaveBeenCalledTimes(1);

});

````

## Great helper functions

Use [jest-in-case](https://github.com/atlassian/jest-in-case) to create variations of the same test.

Taken from [Kent C. Dodds blog](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests):

```js
import cases from 'jest-in-case';
import fizzbuzz from '../fizzbuzz';

cases(
  'fizzbuzz',
  ({ input, output }) => expect(fizzbuzz(input)).toBe(output),
  [
    [1, '1'],
    [2, '2'],
    [3, 'Fizz'],
    [5, 'Buzz'],
    [9, 'Fizz'],
    [15, 'FizzBuzz'],
    [16, '16'],
  ].map(([input, output]) => ({
    title: `${input} => ${output}`,
    input,
    output,
  }))
);
````

## Appendix

- `withIntl` is an example of a higher order component used for testing. It wraps a component to be tested. It expects a locale, checks whether it's valid and wraps the provided component with `IntlProvider`.

      	**Usage**:

      	```js
      	const MyComponentWithIntl = withIntl('en_US')(MyComponent);
      	```

      	**withIntl**:

      	```js
      	import React, { createElement } from 'react';
      	import { IntlProvider } from 'react-intl';
      	import first from 'lodash/first';

      	import { appLocales, translationMessages } from 'i18n';

      	/**
      	 * mocks the intl prop from react-intl to be used in tests
      	 */
      	export const mockIntl = {
      	  formatMessage: ({ defaultMessage }) => defaultMessage,
      	  formatDate: () => '',
      	  formatTime: () => '',
      	  formatRelative: () => '',
      	  formatNumber: () => '',
      	  formatPlural: () => '',
      	  formatHTMLMessage: () => '',
      	  now: () => 1337,
      	};

      	export const validateLocale = locale =>
      	  translationMessages[locale] ? locale : first(appLocales);

      	export const getMessages = locale => translationMessages[locale];

      	export const getSettings = locale => {
      	  const validLocale = validateLocale(locale);

      	  return {
      	    locale: validLocale,
      	    messages: getMessages(validLocale),
      	  };
      	};

      	export default locale => {
      	  const settings = getSettings(locale);

      	  return component => props =>
      	    <IntlProvider {...settings}>
      	      {createElement(component, props)}
      	    </IntlProvider>;
      	};
      	```
