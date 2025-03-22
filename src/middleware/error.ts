import { Context } from "@oak/oak/context";
import { Next } from "@oak/oak/middleware";
import { makeLog } from "../utils/make-log.ts";

/**
 * 捕获未捕获的异常并记录日志
 * @param _ctx 请求上下文
 * @param next 下一个中间件
 */
export default async (_ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    makeLog(
      "middleware",
      `未捕获异常: ${err}`,
      "error",
    );
  }
};
