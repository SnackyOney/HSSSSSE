import { kv } from "./kv.ts";

export async function get_records() {
  const entries = kv.list({ prefix: ["results"], limit: 100 });
  const results = [];

  for await (const entry of entries) {
    results.push(entry.value);
  }

  return results;
}