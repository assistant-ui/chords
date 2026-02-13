// @ts-nocheck
import * as __fd_glob_16 from "../content/docs/minor-chords/thread-empty.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/minor-chords/suggestion-chips.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/minor-chords/scroll-to-bottom.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/minor-chords/copy-button.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/major-chords/tool-call-renderer.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/major-chords/message-status.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/major-chords/message-action-bar.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/major-chords/follow-up-suggestions.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/major-chords/edit-composer.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/major-chords/composer-action-status.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/major-chords/branch-navigation.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/major-chords/attachment.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/minor-chords/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/major-chords/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "major-chords/meta.json": __fd_glob_1, "minor-chords/meta.json": __fd_glob_2, }, {"index.mdx": __fd_glob_3, "installation.mdx": __fd_glob_4, "major-chords/attachment.mdx": __fd_glob_5, "major-chords/branch-navigation.mdx": __fd_glob_6, "major-chords/composer-action-status.mdx": __fd_glob_7, "major-chords/edit-composer.mdx": __fd_glob_8, "major-chords/follow-up-suggestions.mdx": __fd_glob_9, "major-chords/message-action-bar.mdx": __fd_glob_10, "major-chords/message-status.mdx": __fd_glob_11, "major-chords/tool-call-renderer.mdx": __fd_glob_12, "minor-chords/copy-button.mdx": __fd_glob_13, "minor-chords/scroll-to-bottom.mdx": __fd_glob_14, "minor-chords/suggestion-chips.mdx": __fd_glob_15, "minor-chords/thread-empty.mdx": __fd_glob_16, });