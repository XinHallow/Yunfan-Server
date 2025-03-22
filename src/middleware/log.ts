import { Context } from "@oak/oak/context";
import { Next } from "@oak/oak/middleware";
import { makeLog } from "../utils/make-log.ts";

/**
 * 日志中间件
 * @param ctx 请求上下文
 * @param next 下一个中间件
 */
export default async (ctx: Context, next: Next) => {
  makeLog(
    "middleware",
    `获取请求 (${ctx.request.method}) ${ctx.request.url.pathname}`,
    "info",
  );
  await next();
};
