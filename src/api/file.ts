import { join } from "@std/path";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../utils/response.ts";
import { ApiBase } from "./base.ts";
import { contentType } from "../utils/content-type.ts";

class FileGetter extends ApiBase {
  override async resolve(
    _request: Request,
    urlPatternResult: URLPatternResult | null,
  ): Promise<Response> {
    // Ensure file entered
    if (!urlPatternResult || !urlPatternResult.pathname.groups["file"]) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "未输入需要获取的文件" }),
      );
    }

    // Try read file
    try {
      const requireFilepath = urlPatternResult.pathname.groups["file"];
      const fileContent = await Deno.readFile(
        join(".", "public", requireFilepath),
      );
      const fileExtension = requireFilepath.substring(
        requireFilepath.lastIndexOf(".") + 1,
      );
      const fileContentType = contentType[fileExtension]
        ? contentType[fileExtension]
        : "application/octet-stream";

      return generateOKResponse(fileContent, fileContentType);
    } catch (error) {
      // When file not found
      if (error instanceof Deno.errors.NotFound) {
        return generateBadRequestResponse(
          JSON.stringify({ message: "未找到文件" }),
        );
      } else {
        return generateBadRequestResponse(
          JSON.stringify({ message: "读取文件失败" }),
        );
      }
    }
  }
}

export default new FileGetter(
  "GET",
  new URLPattern({ pathname: "/file/:file*" }),
);
