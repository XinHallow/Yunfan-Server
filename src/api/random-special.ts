import generators from "../generators/mod.ts";
import {
  generatorBadRequestResponse,
  generatorOKResponse,
} from "../utils/response.ts";

const pattern = new URLPattern({ pathname: "/api/v1/random-special" });
const specialExclude: number[] = [27, 43, 44, 49, 51];

export default async (request: Request): Promise<Response> => {
  // 检查请求
  if (request.method !== "POST") {
    throw new Error("不允许的请求方法");
  }
  if (!request.body) {
    throw new Error("请求体为空");
  }
  if (!pattern.test(request.url)) {
    throw new Error("请求路径不匹配");
  }

  // 处理请求体
  const { max, min, count, exclude } = await request.json();

  // 检查请求体参数
  if (
    ![max, min, count, ...exclude].every((value): boolean => {
      if (isNaN(value)) {
        return false;
      } else if (!Number.isInteger(value)) {
        return false;
      } else {
        return true;
      }
    })
  ) {
    throw new Error("请求体错误");
  }

  // 尝试包含特殊排除的随机数
  try {
    const result: number[] = generators.randomInt(min, max, count, [
      ...new Set<number>([...exclude, ...specialExclude]),
    ]);
    return generatorOKResponse(JSON.stringify(result));
  } catch (_) {
    // 如果失败就使用原始的排除方案
    try {
      const result: number[] = generators.randomInt(min, max, count, exclude);
      return generatorOKResponse(JSON.stringify(result));
    } catch (_) {
      return generatorBadRequestResponse(
        JSON.stringify({ message: "生成随机数失败" })
      );
    }
  }
};
