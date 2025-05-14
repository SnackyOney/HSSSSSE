import { kv } from "./kv.ts";
import { get_records } from "./query.ts";

export async function delete_records(name, id) {
  await kv.delete([name, id]);
}

export async function delete_all_records() {
  const data = await get_records();

  data.forEach((item) => {
    delete_records("results", item.id);
  });
}