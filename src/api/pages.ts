import { generatorBadRequestResponse } from "../utils/response.ts";
import { join } from "@std/path";

const pattern = new URLPattern({ pathname: "/page/:page*" });

export default async (request: Request): Promise<Response> => {
  // 检查请求
  if (request.method !== "GET") {
    throw new Error("不允许的请求方法");
  }
  if (!pattern.test(request.url)) {
    throw new Error("请求路径不匹配");
  }

  // 获取文件路径
  const match = pattern.exec(request.url);
  if (!match?.pathname.groups.page) {
    throw new Error("请求错误");
  }
  
  const requirePagePath = match.pathname.groups.page;
  const filepath = join(".", "public", requirePagePath, "index.html");

  // 尝试获取文件
  try {
    const content = await Deno.readFile(filepath);
    // 返回结果
    return new Response(content, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return generatorBadRequestResponse(
        JSON.stringify({ message: "未找到页面" }),
      );
    } else {
      throw new Error("未知错误");
    }
  }
};
