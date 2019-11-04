import { TextProps, TextStyle, Text as RNText } from "react-native";
import React, { ReactNode } from "react";
import stringToTree, { TextTree } from "./parser";

export type StylesDict = { [key: string]: TextStyle };

/**
 * Transforms the TextTree into a tree of jsx Text element
 * For each element search its style in the styles dictionary and apply it if found
 */
function mapToJsx(tree: TextTree, styles: StylesDict): string | JSX.Element {
  if (typeof tree === "string") return tree;

  const [styleName, children] = tree;
  if (styleName === "") {
    return <>{children.map(subTree => mapToJsx(subTree, styles))}</>;
  }
  const style = styles[styleName];
  if (!style) {
    console.warn(`can't find style ${styleName}`);
  }

  return (
    <RNText style={style || {}} key={children.toString()}>
      {children.map(x => mapToJsx(x, styles))}
    </RNText>
  );
}

type Props = TextProps & {
  children?: ReactNode;
  nestedStyles?: StylesDict;
};

const Text = ({ children, nestedStyles, ...props }: Props) => {
  return (
    <RNText {...props}>
      {nestedStyles && typeof children === "string"
        ? mapToJsx(stringToTree(children), nestedStyles)
        : children}
    </RNText>
  );
};

export default Text;
