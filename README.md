```ts
import Text, { TreeStyle } from 'react-native-nested-text';

const treeStyle: TreeStyle = {
  s: main,
  sb: [{ s: blue, sb: [{ s: red }] }, { s: green }],
};

<Text style={treeStyle}>
  {'Lorem <{ipsum <{dolor}> sit amet}>, consectetur <{adipiscing}> elit'}
</Text>

```

![Screenshot_nested_text](https://user-images.githubusercontent.com/22659282/67957460-ee97dd00-fbf5-11e9-90b0-612ac46daf71.jpg)
