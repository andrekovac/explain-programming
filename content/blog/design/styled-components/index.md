---
title: 'Styled Components'
description: 'Tricky stuff with CSS-in-JS framework styled-components'
date: '2019-08-02'
author: 'André Kovac'
category: 'framework'
tags: ['design', 'css', 'javascript', 'react-native']
draft: false
ready: true
---

## Styled Components in React Native

Styled Components are a wonderful tool to use

### React Native StyleSheets vs. Styled Components

|| React Native StyleSheets | [Styled-Components](https://styled-components.com/) |
|:---|---|---|
| **Syntax** | CSS in JS (e.g. `backgroundColor`)  | CSS (as in Web, e.g. `background-color)`  |
| **Component names** | `<View style={styles.container} />` | `<Container />` |
| **Learning curve** | CSS in JS easier when used to React Native | CSS easier with existing background in Web-Development  |
| | Template literal syntax has to be learned (eased via template code) | Writing CSS styles as JS objects has to be learned (eased via template code) |
| **Theme Creation** | Creation of custom theme context necessary | Built-in theme prop (with ThemeProvider context) |

### Code Comparison

- React Native StyleSheet

  ```tsx
  import React from 'react';
  import { View, Text, StyleSheet } from 'react-native';

  const Dummy = () => {
    return (
      <View style={[styles.container, styles.rounded]}>
        <Text>Hello World</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: 'black',
      borderStyle: 'solid',
    },
    rounded: {
      borderRadius: 10,
    },
  });

  export default Dummy;
  ```

- Styled Components

  ```tsx
  import React from 'react';
  import { Text } from 'react-native';
  import styled from 'styled-components/native';

  const Dummy = () => {
    return (
      <Container rounded>
        <Text>Hello World</Text>
      </Container>
    );
  };

  type ContainerProps = { rounded: boolean };

  const Container = styled.View<ContainerProps>`
    border: 1px solid black;
    border-radius: ${props => (props.rounded ? '10px' : 0)};
  `;

  export default Dummy;
  ```


### Styled Components with custom components

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const OtherComponent = ({ style }) => {
  return (
    <View style={{ backgroundColor: 'blue', ...style }}>
      <Text>Other Component</Text>
    </View>
  );
};

const StyledOtherComponent = styled(OtherComponent)`
  background-color: red;
`;

export default StyledOtherComponent;
```

Style components from packages, e.g. `LinearGradient` from `react-native-linear-gradient`:

```tsx:title=WelcomeScreen.tsx
const WelcomeScreen: FunctionComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <Container
      colors={['#f26c6c', '#e1f149']}
    >
      {/* */}
    </Container>
  );
}

// ...

const Container = styled(LinearGradient)<{ borderRadius?: number }>`
  flex: 1;
  padding: ${props => props.theme.paddingLarge};
`;
```

## Attributes `attrs`

### `ScrollView` Example

In React Native the `ScrollView` expects to style the container with a different **prop** - it can't be styled as a Styled-Component.

It can be provided via `attrs`. In this example the `contentContainerStyle` of a ScrollView is styled:

```js
const Container = styled.ScrollView.attrs(props => ({
  bounces: false,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}))`
  padding: 15px;
`;
```

### `TextInput` Example

```ts
const Input = styled.TextInput.attrs({ placeholderTextColor: 'rgba(60, 60, 67, 0.3)' })<TextInputPropsT>`
    background-color: ${ props => props.error ? 'rgba(193,17,17,0.25)' : '#F5F5F5' };

    /* border */
    border-radius: 6px;
    border-bottom-width: 1px;
    border-bottom-color: #E0E0E0;

    /* layout */
    padding: 0 27px 0 16px;
    height: 44px;

    /* Font */
    font-weight: ${ props => (props.value?.length ?? 0) > 0 ? 600 : 400 };
    font-size: 16px;
`;
```

### Own components example

It also works with own components which are prepared for styled-components:

```ts
const TitleViewFlexed = styled(TitleView).attrs({
  containerStyle: {
    marginTop: 32,
  },
})`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: -8px;
`;
```

In `TitleView.tsx` the `{...props}` in `<Content {...props}>{props.children}</Content>` is super important.

Only via this line the styled-components styles set above do style the `Content` component of `TitleView.tsx`.

```ts:title=TitleView.tsx
// External imports
import React, { FunctionComponent, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import InputTitle from './InputTitle';

type TitleViewPropsT = {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  children: ReactNode;
};

const TitleView: FunctionComponent<TitleViewPropsT> = (
  props: TitleViewPropsT
) => {
  return (
    <View style={props.containerStyle}>
      <InputTitle>{props.title}</InputTitle>

      <Content {...props}>{props.children}</Content>
    </View>
  );
};

const Content = styled.View`
  margin-top: 8px;
`;

export default TitleView;
```

#### Comment

- Currently when you style this component with **styled-components** it’s the `Content` which is styled and not the outer part. The outer part you style with the `containerStyle` prop which accepts a style object.
- A different approach for an API here would be to style the outer part with styled-components. Might feel more like what you'd expect and then have a prop `contentStyle` to style whatever is inside.


### 3-rd party component example

Would also work for external 3-rd party components like `DropDownPicker`, i.e.

```tsx
import DropDownPicker from 'react-native-dropdown-picker';

const Picker = styled(DropDownPicker).attrs({
  containerStyle={{ /* ... */ }}
  labelStyle={{ /* ... */ }}
  /* ...other style values as style objects */
})`
  /* styles for styles prop */
`;
```

## `css`

Create `css` style to be used in several styled components, e.g.:

```tsx
const ContainerStyle = css`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 18px;
  padding-vertical: 12px;
`;

const InhalerContainerTouchable = styled.TouchableOpacity`
  ${ContainerStyle};
  flex-direction: column;
`;
```

## Theming

### Default theme

Defining a theme

```ts:title=themes/default.ts
import * as Colors from '../styles/colors';
import * as Fonts from '../styles/fonts';
import * as Layout from '../styles/layout';

const theme = {
  // Color
  palette: {
    common: {
      black: Colors.black,
      darkGray: Colors.darkGray,
    },
    primary: Colors.colorPrimary,
    secondary: Colors.colorSecondary,
  },

  // Font
  fontSizeSmall: Fonts.fontSizeSmall,
  fontSizeMedium: Fonts.fontSizeMedium,
  fontSizeLarge: Fonts.fontSizeLarge,
  fontWeightLight: Fonts.fontWeightLight,
  fontWeightMedium: Fonts.fontWeightMedium,
  fontWeightHeavy: Fonts.fontWeightHeavy,

  // Layout
  borderRadiusSmall: Layout.borderRadiusSmall,
  borderRadiusMedium: Layout.borderRadiusMedium,
  paddingMedium: Layout.paddingMedium,
  paddingLarge: Layout.paddingLarge,
  marginMedium: Layout.marginMedium,
  marginLarge: Layout.marginLarge,
};

export default theme;
```

### Using the theme prop in a styled component

```tsx:title=ButtonWide.tsx
const Wrapper = styled.TouchableOpacity<Pick<ButtonWidePropsT, 'variant'>>`
  ${props => {
    switch (props.variant) {
      case ButtonWideVariant.OUTLINED:
        return `
          background-color: transparent;
        `;
      case ButtonWideVariant.WHITE:
      default:
        return `
          background-color: ${props.theme.palette.secondary};
        `;
    }
  }}

  /* Layout */
  padding: ${props => props.theme.paddingMedium} 0;
  margin: ${props => props.theme.marginMedium} 0;

  /* Border */
  border: ${props => `1px solid ${props.theme.palette.secondary}`};
  border-radius: ${props => props.theme.borderRadiusMedium};

  /* children */
  align-items: center;
`;
```

### Apply theme with `ThemeProvider`

1. Wrap app root component with `ThemeProvider`
2. Retrieve desired `theme` value from Redux store.

```tsx:title=App.tsx
import React, { FunctionComponent } from 'react';
import { StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';

import store from 'store';
import { RootStateT } from 'store/reduxRoot';
import { SettingsT } from 'store/settings/types';

import IntroScreen from 'screens/IntroScreen';

/**
 * Main part of the app - redux is accessible here
 */
const AppMain = () => {
  const { theme } = useSelector<RootStateT, SettingsT>(state => state.settings);

  return (
    <ThemeProvider theme={theme}>
      <IntroScreen />
    </ThemeProvider>
  );
};

/**
 * Shell around the app which injects the global redux store
 */
const App: FunctionComponent = () => (
  <Container>
    <StatusBar barStyle="light-content" />
    <Provider store={store}>
      <AppMain />
    </Provider>
  </Container>
);

const Container = styled.View`
  flex: 1;
`;

export default App;
```


### Flavors

Create a flavor by extending the default theme.

```ts:title=themes/flavor.ts
import produce from 'immer';

import defaultTheme from './default';

/**
 * New flavor theme extends the default theme
 */
const theme = produce(defaultTheme, draft => {
  draft.palette.primary = '#2b762c';
  draft.palette.secondary = '#5dfc5f';
});

export default theme;
```

The `immer.js` library here allows to just declare the differences to the `defaultTheme`. `immer.js`'s `produce` function takes care of merging the themes as desired.

### Theme in normal components

Sometimes you may want to use the colors you defined in a theme inside of a regular component as opposed to a styled component.
In a styled component you can easily retrieve the theme via `props.theme`. However, in a regular component you have to retrieve the `theme` via React context:

```tsx:title=WelcomeScreen.tsx {1-2,5,9}
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';

const WelcomeScreen: FunctionComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <LinearGradient
      colors={[theme.palette.gradient.start, theme.palette.gradient.end]}
    >
      {/* ... */}
    </LinearGradient>
  );
}
```

We use the `useContext` hook to retrieve the `ThemeContext` which is defined via

### Theme and TypeScript

See this great articles <https://medium.com/rbi-tech/theme-with-styled-components-and-typescript-209244ec15a3> and the new code!

Create `app/styled.d.ts` declaration file for code completion support in VSCode.

```ts:title=app/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // Color
    palette: {
      common: {
        black: string;
        darkGray: string;
      };
      primary: string;
      secondary: string;
    };

    // Font
    fontSizeSmall: string;
    fontSizeMedium: string;
    fontSizeLarge: string;
    fontWeightLight: number;
    fontWeightMedium: number;
    fontWeightHeavy: number;

    // Layout
    borderRadiusSmall: string;
    borderRadiusMedium: string;
    paddingMedium: string;
    paddingLarge: string;
    marginMedium: string;
    marginLarge: string;
  }
}
```