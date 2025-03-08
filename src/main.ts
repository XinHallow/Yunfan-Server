import handlers from "./api/mod.ts";
import { generatorBadRequestResponse } from "./utils/response.ts";

let logCount = 0;
/**
 * 主函数
 * @param request 请求体
 * @returns 响应体
 */
const main = async (request: Request): Promise<Response> => {
  for (const handlerKey in handlers) {
    try {
      const handlerFunction = handlers[handlerKey];
      const handlerResponse: Response = await handlerFunction(request);
      if (handlerResponse) {
        return handlerResponse;
      }
    } catch (_) {
      continue;
    }
  }
  if (logCount >= 100) {
    console.clear();
    logCount = 0;
  }
  console.log(`${request.method}: ${request.url}`);
  logCount++;

  // 当没有合适的处理器时，返回错误信息
  return generatorBadRequestResponse(
    JSON.stringify({ message: "未找到文件或可用的api" }),
  );
};

// 创建服务器
Deno.serve({ port: 80 }, main);
