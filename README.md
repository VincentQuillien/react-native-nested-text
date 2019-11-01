```ts
import Text, { StyleTree } from 'react-native-nested-text';

const stylesheet = StyleSheet.create({
  main: { fontSize: 16 },
  red: { color: 'red' },
  blue: { color: 'blue' },
  green: { color: 'green' },
});

const { main, blue, red, green } = stylesheet;

const style: StyleTree = [main, [[blue, [[red]]], [green]]];

...
<Text styleTree={style}>
 {'Lorem <{ipsum <{dolor}> sit amet}>, consectetur <{adipiscing}> elit'}
</Text>
...
```

![Screenshot_nested_text](https://user-images.githubusercontent.com/22659282/67957460-ee97dd00-fbf5-11e9-90b0-612ac46daf71.jpg)
