import { Router } from "@oak/oak";
import { Context } from "@oak/oak/context";
import { join } from "@std/path/join";
import { log } from "../utils/mod.ts";
import { headers, jsonHeaders } from "../utils/headers.ts";

const router = new Router();

router.get("/file/:filepath*", async (ctx: Context) => {
  const result = /^\/file\/(?<filepath>.*)$/.exec(ctx.request.url.pathname);
  if (!result || !result.groups || !result.groups.filepath) {
    ctx.response.status = 404;
    ctx.response.body = { message: "文件未找到" };
    ctx.response.headers = jsonHeaders;
    return;
  }

  try {
    const filepath = result.groups.filepath;
    log("file-router", `获取文件: ${filepath}`, "info");
    const file = await Deno.readFile(join(".", "public", "file", filepath));
    ctx.response.body = file;
    ctx.response.status = 200;
    ctx.response.headers = headers;
    return;
  } catch (_) {
    ctx.response.status = 400;
    ctx.response.body = { message: "无法读取文件" };
    ctx.response.headers = jsonHeaders;
  }
});

export default router;
