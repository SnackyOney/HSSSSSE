import { kv } from "./kv.ts";

export async function insert_records(data) {
  const id = crypto.randomUUID();

  const insert_result = await kv.set(["results", id], {
    id,
    ...data,
  });
}