// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "primitives/branch-navigation.mdx": () => import("../content/docs/primitives/branch-navigation.mdx?collection=docs"), "primitives/composer-action-status.mdx": () => import("../content/docs/primitives/composer-action-status.mdx?collection=docs"), "primitives/copy-button.mdx": () => import("../content/docs/primitives/copy-button.mdx?collection=docs"), "primitives/message-action-bar.mdx": () => import("../content/docs/primitives/message-action-bar.mdx?collection=docs"), "primitives/scroll-to-bottom.mdx": () => import("../content/docs/primitives/scroll-to-bottom.mdx?collection=docs"), "primitives/suggestion-chips.mdx": () => import("../content/docs/primitives/suggestion-chips.mdx?collection=docs"), "primitives/thread-empty.mdx": () => import("../content/docs/primitives/thread-empty.mdx?collection=docs"), }),
};
export default browserCollections;