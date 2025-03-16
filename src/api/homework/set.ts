import { assert } from "@superstruct";
import { ApiBase } from "../base.ts";
import { SetRequestBody, SetStruct } from "./homework-interface.ts";
import {
  generateBadRequestResponse,
  generateOKResponse,
} from "../../utils/response.ts";

class HomeworkSetter extends ApiBase {
  override async resolve(
    request: Request,
    _urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    const body: SetRequestBody = await request.json();

    // Check request body
    try {
      assert(body, SetStruct);
    } catch (_) {
      return generateBadRequestResponse(
        JSON.stringify({ message: "传入的请求体出现错误" })
      );
    }

    // Try write data to kv file
    const kv = await Deno.openKv("https://api.deno.com/databases/259ddd16-fde5-4db3-a76e-5328f40f72b3/connect");
    await kv.set([body.date], body.content);
    kv.close();

    // Return ok response and message
    return generateOKResponse(
      JSON.stringify({ message: "完成写入" }),
      "application/json"
    );
  }
}

export default new HomeworkSetter(
  "POST",
  new URLPattern({ pathname: "/api/v1/homework-set" })
);
