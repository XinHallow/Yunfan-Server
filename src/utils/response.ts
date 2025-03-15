/**
 * 快速生成 `Bad Request` 响应
 * @param body 响应体
 * @returns 响应
 */
export const generateBadRequestResponse = (body: BodyInit): Response => {
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
      // 允许跨站访问
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "*",
    },
    status: 400,
    statusText: "Bad Request",
  });
};

/**
 * 快速生成 `OK` 响应
 * @param body 响应体
 * @returns 响应
 */
export const generateOKResponse = (
  body: BodyInit,
  contentType: string
): Response => {
  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      // 允许跨站访问
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "*",
    },
    status: 200,
    statusText: "OK",
  });
};
