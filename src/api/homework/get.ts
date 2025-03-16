import { ApiBase } from "../base.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";

class HomeworkGetter extends ApiBase {
  override async resolve(
    _request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    // Ensure date entered
    if (!urlPatternResult || !urlPatternResult.pathname.groups["date"]) {
      return generateBadRequestResponse(
        JSON.stringify({
          message: "请求时间未指定",
        })
      );
    }

    // Get date from kv
    const getDate = urlPatternResult?.pathname.groups["date"];
    let kv;
    try {
      kv = await Deno.openKv();
      const result = await kv.get([getDate]);

      // Check date is exist
      if (!result.value) {
        return generateBadRequestResponse(
          JSON.stringify({
            message: "未查找到指定时间的作业",
          })
        );
      }

      return generateOKResponse(
        JSON.stringify(result.value),
        "application/json"
      );
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({
          message: "获取作业数据失败",
        })
      );
    } finally {
      if (kv) {
        kv.close();
      }
    }
  }
}

export default new HomeworkGetter(
  "GET",
  new URLPattern({ pathname: "/api/v1/get-homework/:date" })
);
