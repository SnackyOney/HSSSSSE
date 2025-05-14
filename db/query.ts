import { kv } from "./kv.ts";

export async function get_records() {
  const entries = kv.list({ prefix: ["results"] });
  const results = [];

  console.log("start get");
  for (let i = 0; i < Math.min(100000, entries.length); ++i) {
    results.push(entries[i].value);
    // console.log(entries[i].value);
  }

  // for await (const entry of entries) {
  //   results.push(entry.value);
  // }

  console.log("finish get");

  return results;
}