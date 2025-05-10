// server.ts


const port = 3000;





async function handler(req: Request) {


  const path = new URL(req.url).pathname;


  let filePath = path === "/" ? "/index.html" : path;





  try {


    // Читаем файл из текущей директории


    const file = await Deno.readFile(`.${filePath}`);


    


    // Определяем Content-Type


    const contentType = getContentType(filePath);


    


    return new Response(file, {


      headers: { "Content-Type": contentType },


    });


  } catch {


    // Если файл не найден → 404


    return new Response("Not Found", { status: 404 });


  }


}





// Определяем MIME-тип файла


function getContentType(path: string): string {


  if (path.endsWith(".html")) return "text/html";


  if (path.endsWith(".css")) return "text/css";


  if (path.endsWith(".js")) return "application/javascript";


  return "text/plain";


}





console.log(`Server running on http://localhost:${port}`);


Deno.serve(handler, { port });