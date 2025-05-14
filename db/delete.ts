import { kv } from "./kv.ts";
import { get_records } from "./query.ts";

export async function delete_records(name, id) {
  await kv.delete([name, id]);
  console.log('delete0');
}

export async function delete_all_records() {

  let data = [];

  do {
    data = await get_records();

    data.forEach((item) => {
      if (item.score === 99999) {
        console.log('delete1');
        delete_records("results", item.id);
      }
      else if (item.score === 100000) {
        console.log('delete2');
        delete_records("results", item.id);
      }
      // delete_records("results", item.id);
    });
  } while (data.length != 0);
}