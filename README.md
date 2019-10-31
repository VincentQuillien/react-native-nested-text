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
