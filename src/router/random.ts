import { randomInt } from "../generator/mod.ts";
import { Context, Router } from "@oak/oak";

const router = new Router();

router.get("/random", (ctx: Context) => {
  ctx.response.headers.append("Access-Control-Allow-Origin", "http://localhost");
  ctx.response.headers.append("Access-Control-Allow-Origin", "https://yunfan.deno.dev");

  // 获取参数
  const params = ctx.request.url.searchParams;
  const minStr = params.get("min");
  const maxStr = params.get("max");
  const excludeStr = params.get("exclude");
  const countStr = params.get("count");

  // 检查参数
  if (!minStr || !maxStr || !countStr) {
    ctx.response.status = 400;
    ctx.response.body = { message: "缺少必要参数" };
    return; // 结束请求
  }

  // 转换参数类型
  const min = parseInt(minStr);
  const max = parseInt(maxStr);
  const count = parseInt(countStr);

  // 仅在excludeStr存在时进行转换
  const exclude = excludeStr ? excludeStr.split(",").map(Number) : [];

  // 检查参数是否正确
  if (
    !Number.isSafeInteger(min) ||
    !Number.isSafeInteger(max) ||
    !Number.isSafeInteger(count) ||
    exclude.some((value) => !Number.isSafeInteger(value))
  ) {
    ctx.response.status = 400;
    ctx.response.body = { message: "必要参数错误" };
    return; // 结束请求
  }

  // 生成随机数
  try {
    const randomNumbers = randomInt(min, max, count, [
      ...exclude,
      ...[27, 43, 44, 49, 51],
    ]);
    ctx.response.body = randomNumbers;
    ctx.response.status = 200;
    return; // 结束请求
  } catch (_) {
    try {
      const randomNumbers = randomInt(min, max, count, exclude);
      ctx.response.body = randomNumbers;
      ctx.response.status = 200;
      return; // 结束请求
    } catch (_) {
      ctx.response.status = 400;
      ctx.response.body = { message: "必要参数错误" };
      return; // 结束请求
    }
  }
});

export default router;
