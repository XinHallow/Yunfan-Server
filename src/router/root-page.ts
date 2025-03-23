import { Router } from "@oak/oak/router";
import { join } from "@std/path/join";
import { Context } from "@oak/oak/context";

const router = new Router();

router.get("/", async (context: Context) => {
  context.response.body = await Deno.readFile(join(".", "public", "root.html"));
  return; // 结束请求
});

export default router;
