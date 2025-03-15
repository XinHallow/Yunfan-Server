/**
 * 允许的HTTP请求方法
 */
export type AllowedHttpMethod = "POST" | "GET";

/**
 * 请求处理器接口
 */
export interface RequestResolver {
  resolve(
    request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response>;
}

/**
 * 请求处理器基类
 */
export abstract class ApiBase implements RequestResolver {
  constructor(allowedMethod: AllowedHttpMethod, urlPattern: URLPattern) {
    this.allowedMethod = allowedMethod;
    this.urlPattern = urlPattern;
  }

  /**
   * 处理请求
   * @param request 请求对象
   */
  abstract resolve(
    request: Request,
    urlPatternResult: URLPatternResult | null
  ): Promise<Response>;

  /**
   * 允许使用的HTTP方法，如果不匹配将不会调用resolve方法
   */
  allowedMethod: AllowedHttpMethod;

  /**
   * 请求的URL模式匹配器，如果不匹配将不会调用resolve方法
   */
  urlPattern: URLPattern;
}
