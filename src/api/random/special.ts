// deno-lint-ignore-file no-empty require-await
import { ApiBase } from "../base.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";
import randomInt from "../../gen/random-int.ts";

const specialExclude = [27, 43, 44, 49, 51];

class RandomSpecial extends ApiBase {
  override async resolve(
    request: Request,
    _urlPatternResult: URLPatternResult | null,
  ): Promise<Response> {
    const url = new URL(request.url);
    const min = Number(url.searchParams.get("min"));
    const max = Number(url.searchParams.get("max"));
    const count = Number(url.searchParams.get("count"));
    const exclude = url.searchParams.get("exclude")?.split(",").map(Number) ||
      [];

    // Validate parameters
    if (isNaN(min) || isNaN(max) || isNaN(count) || !Array.isArray(exclude)) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "错误的传入参数" }),
      );
    }

    // Try special random method
    try {
      const result = randomInt(min, max, count, [
        ...exclude,
        ...specialExclude,
      ]);
      return generateOKResponse(JSON.stringify(result), "application/json");
    } catch (_) {}

    // Try normal random method
    try {
      const result = randomInt(min, max, count, exclude);
      return generateOKResponse(JSON.stringify(result), "application/json");
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "传入参数值错误" }),
      );
    }
  }
}

export default new RandomSpecial(
  "GET",
  new URLPattern({
    pathname: "/api/v1/random/special",
  }),
);
