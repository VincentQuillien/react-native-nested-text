# react-native-nested-text

Apply as many styles as you want in a single Text element simply by tagging parts of the string.

## Installation

`npm install react-native-nested-text --save`

## Usage

Tag parts of the string you want to style: `<{style|string}>`. You can nest your tags like in any other markup language.

Then pass an object to Text `nestedStyles` prop with your react native styles as values and the names specified in the tags as keys.

```ts
import Text from 'react-native-nested-text';

const { blue, red, green } = stylesheet;
const styles = { r: red, g: green, b: blue };

<Text nestedStyles={styles}>
 {'Lorem <{b|ipsum <{r|dolor}> sit amet}>, consectetur <{g|adipiscing}> elit'}
</Text>
```

![capture_react-native-nested-text](https://user-images.githubusercontent.com/22659282/68723575-384ed300-05b9-11ea-9eba-1945f2fa3287.jpg)

Like a simplistic markdown with only one tag and it takes the name of a React Native style object.

## Motivation

React Native currently only allows a single style by Text element so you need to [nest](https://facebook.github.io/react-native/docs/text#nested-text) them to obtain the desired effect.

It breaks the flow of the text and it quickly becomes hard to read, especially when you have nesting several levels deep.
If you are using internationalisation it will also significantly grow the number of entries in your translation files.

The same exemple as above in React Native vanilla :
```js

// translation file
const latin = {
    loremIpsum: [
        "Lorem",
        " ipsum ",
        " dolor",
        " sit amet",
        ", consectur",
        " asipiscing",
        " elit",
    ]
}

// react component
import Text from 'react-native-nested-text';

const { blue, red, green } = stylesheet;

const LoremIpsum = () => (
  <Text>
    {loremIpsum[0]}
    <Text style={styles.b}>
      {loremIpsum[1]}
      <Text style={styles.r}>{loremIpsum[2]}</Text>
      {loremIpsum[3]}
    </Text>
    {loremIpsum[4]}
    <Text style={styles.g}>{loremIpsum[5]}</Text>
    {loremIpsum[6]}
  </Text>
);

```

 
