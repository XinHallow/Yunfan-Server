import { Router } from "@oak/oak/router";
import { join } from "@std/path/join";
import { Context } from "@oak/oak/context";
import { htmlHeaders } from "../utils/headers.ts";

const router = new Router();

router.get("/", async (context: Context) => {
  context.response.body = await Deno.readFile(join(".", "public", "root.html"));
  context.response.headers = htmlHeaders;
  return; // 结束请求
});

export default router;
