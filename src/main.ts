import { apis } from "./api/mod.ts";

import fallback from "./api/fallback.ts";

Deno.serve({ port: 80 }, async (request: Request): Promise<Response> => {
  // 遍历所有注册的API
  for (const apiName in apis) {
    const api = apis[apiName];

    // 检查请求方法和URL是否匹配当前API的定义
    if (
      api.allowedMethod !== request.method ||
      !api.urlPattern.test(request.url)
    ) {
      continue;
    }

    // 如果匹配，调用API的解析方法并返回响应
    return await api.resolve(request, api.urlPattern.exec(request.url));
  }

  // 如果没有可用的API则尝试读取内嵌HTML
  return fallback.resolve(request, fallback.urlPattern.exec(request.url));
});
