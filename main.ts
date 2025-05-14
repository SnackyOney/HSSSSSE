import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

import { insert_records } from "./db/insert.ts";
import { get_records } from "./db/query.ts";
import { delete_all_records } from "./db/delete.ts";

export const port = 8000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const handler = async (req) => {
  const url = new URL(req.url);
  // console.log("start delete");
  // await delete_all_records();

  // console.log(await get_records());

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: new Headers(corsHeaders) });
  }

  let filePath = url.pathname === "/" ? "/index.html" : url.pathname;

  if (url.pathname === "/api/results") {
      if (req.method === "GET") {
        const results = await get_records();
        return Response.json(results, { headers: corsHeaders });
      }
      if (req.method === "POST") {
        const data = await req.json();
        await insert_records(data);
        return new Response("OK", { headers: new Headers(corsHeaders) });
      }
  }
    const file = await Deno.readFile(`.${filePath}`);
    return new Response(file, {
      headers: {
        "Content-Type": getContentType(filePath),
        ...corsHeaders,
      },
    });
};

function getContentType(path) {
  if (path.endsWith(".html")) return "text/html";

  if (path.endsWith(".css")) return "text/css";

  if (path.endsWith(".js")) return "application/javascript";

  if (path.endsWith(".ts")) return "application/javascript";

  if (path.endsWith(".png")) return "image/png";

  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";

  if (path.endsWith(".webp")) return "image/webp";

  if (path.endsWith(".svg")) return "image/svg+xml";

  return "text/plain";
}
console.log(`Server running on http://localhost:${port}`);
Deno.serve(handler, { port });
