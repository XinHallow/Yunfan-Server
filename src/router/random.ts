import randomInt from "../generator/random-int.ts";
import { Context, Router } from "@oak/oak";
import { headers } from "../utils/headers.ts";

const router = new Router();

router.get("/random", (context: Context) => {
  // 获取参数
  const params = context.request.url.searchParams;
  const minStr = params.get("min");
  const maxStr = params.get("max");
  const excludeStr = params.get("exclude"); // 这里可能会是null
  const countStr = params.get("count");

  // 检查参数
  if (!minStr || !maxStr || !countStr) {
    context.response.status = 400;
    context.response.body = { message: "缺少必要参数" };
    context.response.headers = headers;
    return;
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
    context.response.status = 400;
    context.response.body = { message: "必要参数错误" };
    context.response.headers = headers;
    return; // 添加return以停止函数执行
  }

  // 生成随机数
  try {
    const randomNumbers = randomInt(min, max, count, [
      ...exclude,
      ...[27, 43, 44, 49, 51],
    ]);
    context.response.body = randomNumbers;
    context.response.status = 200;
    context.response.headers = headers;
    return; // 结束请求
  } catch (_) {
    try {
      const randomNumbers = randomInt(min, max, count, exclude);
      context.response.body = randomNumbers;
      context.response.status = 200;
      context.response.headers = headers;
      return; // 结束请求
    } catch (_) {
      context.response.status = 400;
      context.response.body = { message: "必要参数错误" };
      context.response.headers = headers;
      return; // 结束请求
    }
  }
});

export default router;
