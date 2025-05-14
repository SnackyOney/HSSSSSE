import { kv } from "./kv.ts";

export async function get_records() {
  // const entries = kv.list({ prefix: ["results"] });
  let results = [];

  console.log("start get");
  for (let i = 0; i < 1000; ++i) {
    let current = kv.get(["results"]);
    console.log(current);
    results.push(current.value);
    console.log(current.value);
  }

  // for await (const entry of entries) {
  //   results.push(entry.value);
  // }

  console.log("finish get", results.length);

  return results;
}