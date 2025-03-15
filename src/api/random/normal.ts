import { ApiBase } from "../base.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";
import randomInt from "../../gen/random-int.ts";

class RandomNormal extends ApiBase {
  override async resolve(
    request: Request,
    _urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    const { min, max, exclude, count } = await request.json();

    // 尝试随机数
    try {
      const result = randomInt(min, max, count, exclude);
      return generateOKResponse(JSON.stringify(result), "application/json");
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "错误的传入参数" })
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
