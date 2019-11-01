import { TextProps, TextStyle, Text as RNText } from "react-native";
import React, { ReactNode } from "react";

interface Nd<T> {
  nd: Tree<T>[];
}

type Tree<T> = Nd<T> | T;

export type StyleTree = [TextStyle, StyleTree[]?];

/**
 * Parse the input string to produce a tree of the nested tag
 *
 */
function stringToTree(text: string) {
  const tokens = text.split(/(<{|}>)/);
  const stringToTree = (tokens: string[]): [Nd<string>, string[]] => {
    if (tokens.length === 0) return [{ nd: [] }, []];
    const [head, ...tail] = tokens;
    if (head === "<{") {
      const [subTree, tokensLeft] = stringToTree(tail);
      const [{ nd: children }, tokensLeft2] = stringToTree(tokensLeft);
      return [{ nd: [subTree, ...children] }, tokensLeft2];
    }
    if (head === "}>") {
      return [{ nd: [] }, tail];
    }
    const [{ nd: children }, tokensLeft] = stringToTree(tail);
    return [{ nd: [head, ...children] }, tokensLeft];
  };
  const [tree, tokensLeft] = stringToTree(tokens);
  if (tokensLeft.length !== 0) throw new Error("parsing");
  return tree;
}

/**
 * Merge the tree of strings and the tree of styles into a tree of jsx text elements
 */
function mergeToJsx(stringTree: Tree<string>, styleTree: StyleTree) {
  const aux = (
    stringChildren: Tree<string>[],
    styleChildren: StyleTree[] | undefined = []
  ): ReturnType<typeof mergeToJsx>[] => {
    const [strHd, ...strTl] = stringChildren;
    const [stlHd, ...stlTl] = styleChildren;
    if (!strHd) {
      if (stlHd) console.warn("mismatched trees");
      return [];
    }
    if (typeof strHd === "string") {
      return [mergeToJsx(strHd, styleTree), ...aux(strTl, styleChildren)];
    }
    if (stlHd === undefined) console.warn("mismatched trees");
    return [mergeToJsx(strHd, stlHd || { s: {} }), ...aux(strTl, stlTl)];
  };

  if (typeof stringTree === "string") {
    return stringTree;
  }
  const [style, styleChildren] = styleTree;
  return (
    <RNText style={style} key={stringTree.nd.toString()}>
      {aux(stringTree.nd, styleChildren)}
    </RNText>
  );
}

type Props = TextProps & {
  styleTree?: StyleTree;
  children?: ReactNode;
};

const Text = ({ styleTree, children, ...props }: Props) => {
  return (
    <RNText {...props}>
      {styleTree && typeof children === "string"
        ? mergeToJsx(stringToTree(children), styleTree)
        : children}
    </RNText>
  );
};

export default Text;
