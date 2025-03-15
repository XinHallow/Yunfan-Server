import { join } from "@std/path";
import { generateOKResponse } from "../utils/response.ts";
import { ApiBase } from "./base.ts";

class Fallback extends ApiBase {
  override async resolve(
    _request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    // 当请求的是根目录下时直接返回index.html
    if (!urlPatternResult || !urlPatternResult.pathname.groups["page"]) {
      return generateOKResponse(
        await Deno.readFile(join(".", "public", "index.html")),
        "text/html"
      );
    }

    // 生成文件路径
    const filePath = join(
      ".",
      "public",
      urlPatternResult.pathname.groups["page"],
      "index.html"
    );

    // 检查文件是否存在
    const fileExists = await Deno.stat(filePath)
      .then(() => true)
      .catch(() => false);

    // 当不存在时重定向
    if (!fileExists) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    // 当存在时返回请求目录下的index.html
    const fileContent = await Deno.readFile(filePath);
    return generateOKResponse(fileContent, "text/html");
  }
}

export default new Fallback(
  "GET",
  new URLPattern({ pathname: "/:page*" })
);
