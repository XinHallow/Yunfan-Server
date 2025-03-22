import { Context, Router } from "@oak/oak";
import { join } from "@std/path/join";

const router = new Router();

router.get("/toolkit/:toolName*", async (context: Context) => {
  // 解析名称
  const result = /^\/toolkit\/(?<toolName>[^\/]+)\/?$/
    .exec(context.request.url.pathname);
  if (!result || !result.groups || !result.groups.toolName) {
    context.response.status = 404;
    context.response.body = "没有该工具";
    return; // 结束请求
  }

  try {
    const toolName = result.groups.toolName;
    const toolContent = await Deno.readFile(
      join(".", "public", "toolkit", `${toolName}.html`),
    );
    context.response.body = toolContent;
    context.response.status = 200;
    return; // 结束请求
  } catch (_) {
    context.response.status = 404;
    context.response.body = "没有该工具";
    return; // 结束请求
  }
});

export default router;
