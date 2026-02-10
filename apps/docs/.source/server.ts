// @ts-nocheck
import * as __fd_glob_10 from "../content/docs/primitives/thread-empty.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/primitives/suggestion-chips.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/primitives/scroll-to-bottom.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/primitives/message-action-bar.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/primitives/copy-button.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/primitives/composer-action-status.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/primitives/branch-navigation.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/primitives/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "primitives/meta.json": __fd_glob_1, }, {"index.mdx": __fd_glob_2, "installation.mdx": __fd_glob_3, "primitives/branch-navigation.mdx": __fd_glob_4, "primitives/composer-action-status.mdx": __fd_glob_5, "primitives/copy-button.mdx": __fd_glob_6, "primitives/message-action-bar.mdx": __fd_glob_7, "primitives/scroll-to-bottom.mdx": __fd_glob_8, "primitives/suggestion-chips.mdx": __fd_glob_9, "primitives/thread-empty.mdx": __fd_glob_10, });