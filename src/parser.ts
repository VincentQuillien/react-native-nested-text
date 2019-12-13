export type TextNode = [string /* style name */, TextTree[] /* children */];
export type TextTree = TextNode | string;

/**
 * Parse the input string to produce a tree of the nested tag
 */
function stringToTree(text: string) {
  const tokens = text.split(/(<{[A-zÀ-ū]+\||}>)/);
  const stringToTree = (tokens: string[]): [TextNode, string[]] => {
    if (tokens.length === 0) return [["", []], []];
    const [head, ...tail] = tokens;
    const match = head.match(/<{([A-zÀ-ū]+)\|/);
    const styleName = match && match[1];
    if (styleName) {
      const [[_, children], tokensLeft] = stringToTree(tail);
      const [[parentStyleName, nodes], tokensLeft2] = stringToTree(tokensLeft);
      return [
        [parentStyleName, [[styleName, children], ...nodes]],
        tokensLeft2
      ];
    }
    if (head === "}>") {
      return [["", []], tail];
    }
    const [[_styleName, children], tokensLeft] = stringToTree(tail);
    return [[_styleName, [head, ...children]], tokensLeft];
  };
  const [tree, tokensLeft] = stringToTree(tokens);
  if (tokensLeft.length !== 0) console.warn("parsing error");
  return tree;
}

export default stringToTree;
