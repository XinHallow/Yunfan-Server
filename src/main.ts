import handlers from "./handler/mod.ts";

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

  // 当没有合适的处理器时，返回错误信息
  return new Response(
    JSON.stringify({
      message: "No APIs or pages are available at this time.",
    }),
    {
      status: 400,
      statusText: "Bad Request",
    }
  );
};

// 创建服务器
Deno.serve({ port: 80 }, main);
