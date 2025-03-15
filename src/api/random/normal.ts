import { ApiBase } from "../base.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";
import randomInt from "../../gen/random-int.ts";
import { requestBody, struct } from "./interface.ts";
import { assert } from "@superstruct";

class RandomNormal extends ApiBase {
  override async resolve(
    request: Request,
    _urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    const body: requestBody = await request.json();

    try {
      assert(body, struct);
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "错误的传入参数" })
      );
    }

    // 尝试随机数
    try {
      const result = randomInt(body.min, body.max, body.count, body.exclude);
      return generateOKResponse(JSON.stringify(result), "application/json");
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "传入参数值错误" })
      );
    }
  }
}

export default new RandomNormal(
  "POST",
  new URLPattern({
    pathname: "/api/v1/random-normal",
  })
);
