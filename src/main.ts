/**
 * 主函数
 * @param request 请求体
 * @returns 响应体
 */
const main = (request: Request): Response => {
  return new Response();
};

// 创建服务器
Deno.serve({ port: 80 }, main);
