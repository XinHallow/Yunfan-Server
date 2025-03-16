import { ApiBase } from "../base.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";

class HomeworkSetter extends ApiBase {
  override async resolve(
    request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    // Parse body
    const body: {
      chinese: string[];
      math: string[];
      english: string[];
    } = await request.json();

    // Check request body
    if (!body.chinese || !body.math || !body.english) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "传入作业出现问题" })
      );
    }

    // Check date
    if (!urlPatternResult || !urlPatternResult.pathname.groups["date"]) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "写入时间未指定" })
      );
    }
    const getDate = urlPatternResult.pathname.groups["date"];

    // Validate homework data
    if (
      !Array.isArray(body.chinese) ||
      !Array.isArray(body.math) ||
      !Array.isArray(body.english) ||
      body.chinese.some((item) => typeof item !== "string") ||
      body.math.some((item) => typeof item !== "string") ||
      body.english.some((item) => typeof item !== "string")
    ) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "作业数据格式不正确" })
      );
    }

    // Try write data to kv file
    let kv;
    try {
      kv = await Deno.openKv();
      await kv.set([getDate], body);
      return generateOKResponse(
        JSON.stringify({ message: "完成写入" }),
        "application/json"
      );
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "写入失败" })
      );
    } finally {
      if (kv) {
        kv.close();
      }
    }
  }
}

export default new HomeworkSetter(
  "POST",
  new URLPattern({ pathname: "/api/v1/set-homework/:date" })
);
