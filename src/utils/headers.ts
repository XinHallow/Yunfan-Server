export const headers = new Headers({
  "Access-Control-Allow-Origin": "https://yunfan-server.deno.dev/*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true",
});

export const htmlHeaders = new Headers({
  "Content-Type": "text/html",
  "Access-Control-Allow-Origin": "https://yunfan-server.deno.dev/*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true",
});

export const jsonHeaders = new Headers({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://yunfan-server.deno.dev/*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true",
});
