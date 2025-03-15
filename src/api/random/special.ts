// deno-lint-ignore-file no-empty
import { ApiBase } from "../base.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";
import randomInt from "../../gen/random-int.ts";
import { requestBody, struct } from "./interface.ts";
import { assert } from "@superstruct";

const specialExclude = [27, 43, 44, 49, 51];

class RandomSpecial extends ApiBase {
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

    // 尝试特殊随机数
    try {
      const result = randomInt(body.min, body.max, body.count, [
        ...body.exclude,
        ...specialExclude,
      ]);
      return generateOKResponse(JSON.stringify(result), "application/json");
    } catch (_) {}

    // 如果失败则尝试正常随机数
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

export default new RandomSpecial(
  "POST",
  new URLPattern({
    pathname: "/api/v1/random-special",
  })
);
