export async function onRequest(context) {
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;

    let headers =  {}
    for (const key of request.headers.keys()) {
        headers[key] = request.headers.get(key)
    }

    const url = new URL(request.url);
    
    let obj =   {
        "src": request.headers.get('CF-Connecting-IP'),
        "host": request.headers.get('Host'),
        "method": request.method,
        "protocol": request.cf.httpProtocol,
        "path": url.pathname,
        "size": 0,
        "tls": {
          "version": request.cf.tlsVersion,
          "cipher": request.cf.tlsCipher,
        },
        "headers": headers
      }
    return new Response(JSON.stringify(obj, null, 2));
  }