/**
 * 返回模板OK响应体
 * @param body 响应体
 */
export const generatorOKResponse: GeneratorResponseFunction = (
  body: BodyInit,
): Response => {
  return new Response(body, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

/**
 * 返回模板Bad Request响应体
 * @param body 响应体
 */
export const generatorBadRequestResponse: GeneratorResponseFunction = (
  body: BodyInit,
): Response => {
  return new Response(body, {
    status: 400,
    statusText: "Bad Request",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

/**
 * 返回模板Unauthorized响应体
 * @param body 响应体
 */
interface GeneratorResponseFunction {
  (body: BodyInit): Response;
}
