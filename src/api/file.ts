import contentType from "../utils/content-type.ts";
import { generatorBadRequestResponse } from "../utils/response.ts";
import { join } from "@std/path";

const pattern = new URLPattern({ pathname: "/:file" });

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
  if (!match?.pathname.groups.file) {
    throw new Error("请求错误");
  }
  const requireFilepath = match.pathname.groups.file;
  const filepath = join(".", "public", requireFilepath);

  // 尝试获取文件
  try {
    const content = await Deno.readFile(filepath);
    const responseContentType =
      contentType[requireFilepath.slice(requireFilepath.lastIndexOf(".") + 1)];
    // 返回结果
    return new Response(content, {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": responseContentType },
    });
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return generatorBadRequestResponse(
        JSON.stringify({ message: "未找到文件" })
      );
    } else {
      throw new Error("未知错误");
    }
  }
};
