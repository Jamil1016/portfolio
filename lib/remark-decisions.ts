import type { Root, Heading, List, RootContent } from "mdast";
import { toString } from "mdast-util-to-string";

// Marks the list that directly follows a "Key Decisions" heading so CSS can lay
// it out as cards. Case studies that put a paragraph first keep plain prose.
export default function remarkDecisions() {
  return (tree: Root) => {
    const kids = tree.children;
    for (let i = 0; i < kids.length - 1; i++) {
      const node: RootContent = kids[i];
      if (node.type !== "heading" || (node as Heading).depth !== 2) continue;
      if (!/^key decisions$/i.test(toString(node).trim())) continue;
      const next = kids[i + 1];
      if (next.type !== "list") continue;
      const list = next as List;
      list.data = { ...list.data, hProperties: { ...(list.data?.hProperties ?? {}), className: "cs-decisions" } };
    }
  };
}
