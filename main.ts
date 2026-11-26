// Entry program for the make.fun bounty "makefun-x-reposts-02"
// (Node 22, standard library only).
//
// The entry itself is the list of X posts in POSTS.json: up to fifteen of
// our own posts, each quoting or directly replying to a different post
// from @makefunai's pool. This program does nothing with the posts beyond
// handing their list to the grader: it copies POSTS.json into the output
// directory, where the gate reads it and scores the posts from X itself.
//
// The directories come from the environment, so the grader can run this
// from any working directory: MAKEFUN_BOT_DIR is where the repository is
// mounted (default /bot) and MAKEFUN_OUTPUT_DIR is where the result goes
// (default /output). Nothing here depends on the current working directory,
// touches the network, or reads the clock, so repeated runs write the
// same bytes.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POSTS.json");
const target = join(outputDir, "POSTS.json");

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(
    `POSTS.json could not be copied from ${source} to ${target}: ${(error as Error).message}`,
  );
  process.exit(1);
}
