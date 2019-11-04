```ts
import Text from 'react-native-nested-text';

const { blue, red, green } = stylesheet;

const styles = { r: red, g: green, b: blue };

<Text nestedStyles={styles}>
 {'Lorem <{b|ipsum <{r|dolor}> sit amet}>, consectetur <{g|adipiscing}> elit'}
</Text>
```

![Screenshot_nested_text](https://user-images.githubusercontent.com/22659282/67957460-ee97dd00-fbf5-11e9-90b0-612ac46daf71.jpg)
