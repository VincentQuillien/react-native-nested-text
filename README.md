```ts
const treeStyle: TreeStyle = {
  s: main,
  sb: [{ s: blue, sb: [{ s: red }] }, { s: green }],
};

<Text style={testStyle}>
  {'Lorem <{ipsum <{dolor}> sit amet}>, consectetur <{adipiscing}> elit'}
</Text>

```
