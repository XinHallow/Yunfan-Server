import { matchTimeFromPathname } from "./match-time.ts";
import { makeLog } from "./make-log.ts";

/**
 * 记录日志
 */
export const log = makeLog;

/**
 * 从路径中匹配日期
 * @warning 匹配到的月份和日期前面可能有0
 */
export const matchTime = matchTimeFromPathname;
