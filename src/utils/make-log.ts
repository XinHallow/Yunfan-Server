/**
 * 日志类型
 */
export type LogType =
  | "critical"
  | "error"
  | "warn"
  | "info"
  | "debug"
  | "trace";

/**
 * 记录日志
 * @param name 名称
 * @param content 内容
 * @param type 日志类型
 */
export const makeLog = (name: string, content: string, type: LogType): void => {
  try {
    const timestamp = new Date().toLocaleString();
    const logType = type.toUpperCase();
    console.log(`[${timestamp}] [${logType}] [${name}] ${content}`);
  } catch (error) {
    console.error("日志记录失败:", error);
  }
};
