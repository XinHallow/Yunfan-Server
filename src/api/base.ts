/**
 * Allowed HTTP method
 */
export type AllowedHttpMethod = "POST" | "GET";

/**
 * Resolver interface 
 */
export interface RequestResolver {
  resolve(
    request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response>;
}

/**
 * Resolver base class
 */
export abstract class ApiBase implements RequestResolver {
  constructor(allowedMethod: AllowedHttpMethod, urlPattern: URLPattern) {
    this.allowedMethod = allowedMethod;
    this.urlPattern = urlPattern;
  }

  /**
   * Resolve request
   * @param request request body
   */
  abstract resolve(
    request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response>;

  /**
   * Allowed HTTP method
   */
  allowedMethod: AllowedHttpMethod;

  /**
   * URL pattern for verify url
   */
  urlPattern: URLPattern;
}
