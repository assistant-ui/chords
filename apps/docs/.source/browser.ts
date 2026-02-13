// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "major-chords/attachment.mdx": () => import("../content/docs/major-chords/attachment.mdx?collection=docs"), "major-chords/branch-navigation.mdx": () => import("../content/docs/major-chords/branch-navigation.mdx?collection=docs"), "major-chords/composer-action-status.mdx": () => import("../content/docs/major-chords/composer-action-status.mdx?collection=docs"), "major-chords/edit-composer.mdx": () => import("../content/docs/major-chords/edit-composer.mdx?collection=docs"), "major-chords/follow-up-suggestions.mdx": () => import("../content/docs/major-chords/follow-up-suggestions.mdx?collection=docs"), "major-chords/message-action-bar.mdx": () => import("../content/docs/major-chords/message-action-bar.mdx?collection=docs"), "major-chords/message-status.mdx": () => import("../content/docs/major-chords/message-status.mdx?collection=docs"), "major-chords/tool-call-renderer.mdx": () => import("../content/docs/major-chords/tool-call-renderer.mdx?collection=docs"), "minor-chords/copy-button.mdx": () => import("../content/docs/minor-chords/copy-button.mdx?collection=docs"), "minor-chords/scroll-to-bottom.mdx": () => import("../content/docs/minor-chords/scroll-to-bottom.mdx?collection=docs"), "minor-chords/suggestion-chips.mdx": () => import("../content/docs/minor-chords/suggestion-chips.mdx?collection=docs"), "minor-chords/thread-empty.mdx": () => import("../content/docs/minor-chords/thread-empty.mdx?collection=docs"), }),
};
export default browserCollections;