import defaultComponents from "fumadocs-ui/mdx";
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from "fumadocs-ui/components/codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Callout } from "fumadocs-ui/components/callout";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { ComposerActionStatusDemo } from "@/components/demo/composer-action-status-demo";
import { CopyButtonDemo } from "@/components/demo/copy-button-demo";
import { MessageActionBarDemo } from "@/components/demo/message-action-bar-demo";
import {
  SuggestionChipsDemo,
  SuggestionChipsSimpleDemo,
} from "@/components/demo/suggestion-chips-demo";
import { ThreadEmptyDemo } from "@/components/demo/thread-empty-demo";
import { ScrollToBottomDemo } from "@/components/demo/scroll-to-bottom-demo";
import { BranchNavigationDemo } from "@/components/demo/branch-navigation-demo";
import { MessageStatusDemo } from "@/components/demo/message-status-demo";

type Components = Record<string, React.ComponentType<any>>;

export function getMDXComponents(components?: Components): Components {
  return {
    ...defaultComponents,
    pre: (props: CodeBlockProps) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Tab,
    Tabs,
    TypeTable,
    Callout,
    Step,
    Steps,
    ComposerActionStatusDemo,
    CopyButtonDemo,
    MessageActionBarDemo,
    SuggestionChipsDemo,
    SuggestionChipsSimpleDemo,
    ThreadEmptyDemo,
    ScrollToBottomDemo,
    BranchNavigationDemo,
    MessageStatusDemo,
    blockquote: (props: any) => <Callout>{props.children}</Callout>,
    ...components,
  };
}

export function useMDXComponents(components: Components): Components {
  return getMDXComponents(components);
}
