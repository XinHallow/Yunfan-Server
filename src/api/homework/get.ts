import { assert } from "@superstruct";
import { ApiBase } from "../base.ts";
import { GetRequestBody, GetStruct } from "./homework-interface.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";

class HomeworkSetter extends ApiBase {
  override async resolve(
    request: Request,
    _urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    const body: GetRequestBody = await request.json();

    // Check request body
    try {
      assert(body, GetStruct);
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "传入的请求体出现错误" })
      );
    }

    // Try read data to kv file
    const kv = await Deno.openKv("https://api.deno.com/databases/259ddd16-fde5-4db3-a76e-5328f40f72b3/connect");
    const content = await kv.get([body.date]);
    kv.close();

    // When today's homework is not exist
    if (!content.value) {
      return generateOKResponse(
        JSON.stringify({ message: "未查找到今天的作业" }),
        "application/json"
      );
    }

    // Return ok response and message
    return generateOKResponse(JSON.stringify(content.value), "application/json");
  }
}

export default new HomeworkSetter(
  "POST",
  new URLPattern({ pathname: "/api/v1/homework-get" })
);
