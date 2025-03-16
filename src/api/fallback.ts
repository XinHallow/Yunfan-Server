import { join } from "@std/path";
import { generateOKResponse } from "../utils/response.ts";
import { ApiBase } from "./base.ts";

class Fallback extends ApiBase {
  override async resolve(
    _request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response> {
    // If no pathname return root index.html
    if (!urlPatternResult || !urlPatternResult.pathname.groups["page"]) {
      return generateOKResponse(
        await Deno.readFile(join(".", "public", "index.html")),
        "text/html"
      );
    }

    // Generate filepath
    const filePath = join(
      ".",
      "public",
      urlPatternResult.pathname.groups["page"],
      "index.html"
    );

    // Ensure file exist
    const fileExists = await Deno.stat(filePath)
      .then(() => true)
      .catch(() => false);

    // If not found redirect to root
    if (!fileExists) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }

    // If file exist return this file
    const fileContent = await Deno.readFile(filePath);
    return generateOKResponse(fileContent, "text/html");
  }
}

export default new Fallback(
  "GET",
  new URLPattern({ pathname: "/:page*" })
);
