import { Middleware } from "@oak/oak/middleware";
import error from "./error.ts";
import log from "./log.ts";

/**
 * 捕获未捕获的异常并记录日志
 */
export const errorMiddleware: Middleware = error;

/**
 * 日志中间件
 */
export const logMiddleware: Middleware = log;
