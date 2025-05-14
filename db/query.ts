import { kv } from "./kv.ts";

export async function get_records() {
  const entries = kv.list({ prefix: ["results"] });
  const results = [];

  for (let i = 0; i < Math.min(1000, entries.length); ++i) {
    results.push(entry.value);
  }

  // for await (const entry of entries) {
  //   results.push(entry.value);
  // }

  return results;
}