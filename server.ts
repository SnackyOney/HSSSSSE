let pathname = "/index.html";
const file = await Deno.readFile(pathname);

    const extension = extname(pathname).toLowerCase();
    const mediaType = contentType(extension) || 'application/octet-stream';

    return new Response(file, {
      headers: {
        'content-type': mediaType,
      },
    });
