import { kv } from "./kv.ts";

export async function get_records() {
  const entries = kv.list({ prefix: ["results"], limit: 100 });
  let results = [];

  console.log("start get");

  for await (const entry of entries) {
    results.push(entry.value);
    // console.log(entry.value, 1);
  }

  console.log("finish get", results.length);

  return results;
}