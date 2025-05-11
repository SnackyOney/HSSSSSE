import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

const port = 3000;

async function handler(req) {

  const path = new URL(req.url).pathname;

  let filePath = path === "/" ? "/index.html" : path;

  try {
    const file = await Deno.readFile(`.${filePath}`);

    const contentType = getContentType(filePath);

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}

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