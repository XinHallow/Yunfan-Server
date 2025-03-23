import { marked } from "marked";
import { Context, Router } from "@oak/oak";
import { matchTimeFromPathname } from "../utils/mod.ts";
import { join } from "@std/path/join";

const router = new Router();

// 按照日期返回
router.get("/homework/:date", async (ctx: Context) => {
  // 解析日期
  const matchResult = matchTimeFromPathname(
    "/homework/:date",
    ctx.request.url.pathname,
  );
  if (!matchResult) {
    ctx.response.status = 400;
    ctx.response.body = { message: "日期格式错误" };
    return; // 结束请求
  }

  // 格式化日期
  const { year, month, day } = matchResult;
  const formatDate = `${year}-${month}-${day}`;

  // 尝试从kv中读取数据
  const kv = await Deno.openKv();
  const value = await kv.get([`homework`, `${formatDate}`]);
  kv.close();

  // 当没有获取到作业时返回默认页面
  if (!value.value) {
    ctx.response.status = 200;
    ctx.response.body = await Deno.readFile(
      join(".", "public", "no-selected-homework.html"),
    );
    return; //结束请求
  }

  // 解析内容
  const content = value.value as string;

  try {
    // 加载模板并渲染
    const template = await Deno.readTextFile(
      join(".", "public", "template-homework.html"),
    );
    ctx.response.body = template.replace(
      "{{content}}",
      marked(content, { async: false, "breaks": false }),
    );
    return; //结束请求
  } catch (_) {
    ctx.response.status = 500;
    ctx.response.body = { message: "服务器内部错误" };
    return; //结束请求
  }
});

// 按照最新作业日期返回
router.get("/homework", async (ctx: Context) => {
  const kv = await Deno.openKv();
  const value = await kv.get([`homework`, `latest`]);
  kv.close();

  if (!value.value) {
    ctx.response.status = 200;
    ctx.response.body = await Deno.readFile(
      join(".", "public", "no-selected-homework.html"),
    );
    return; //结束请求
  }

  // 解析内容
  const content = value.value as string;

  try {
    // 加载模板并渲染
    const template = await Deno.readTextFile(
      join(".", "public", "template-homework.html"),
    );
    ctx.response.body = template.replace(
      "{{content}}",
      marked(content, { async: false }),
    );
    return; // 结束请求
  } catch (_) {
    ctx.response.status = 500;
    ctx.response.body = { message: "服务器内部错误" };
    return; // 结束请求
  }
});

// 按照提交最新作业
router.post("/homework/:date", async (ctx: Context) => {
  // 解析日期
  const matchResult = matchTimeFromPathname(
    "/homework/:date",
    ctx.request.url.pathname,
  );
  if (!matchResult) {
    ctx.response.status = 400;
    ctx.response.body = { message: "日期格式错误" };
    return; // 结束请求
  }

  // 格式化日期
  const { year, month, day } = matchResult;
  const formatDate = `${year}-${month}-${day}`;

  // 保存数据到kv中
  const postContent = await ctx.request.body.text();
  const kv = await Deno.openKv();
  await kv.set([`homework`, `latest`], postContent as string);
  await kv.set([`homework`, formatDate], postContent as string);
  kv.close();
  ctx.response.status = 200;
  ctx.response.body = { message: "提交成功" };
  return; // 结束请求
});

export default router;
