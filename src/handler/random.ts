import generators from "../generators/mod.ts";

const pattern = new URLPattern({ pathname: "/api/v1/random" });

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
  return await request.json().then((value) => {
    const { max, min, count, exclude } = value;
    if (!max || !min || !count || !exclude) {
      throw new Error("请求体格式错误");
    }

    // 尝试随机数
    try {
      const result: number[] = generators.randomInt(min, max, count, exclude);
      return new Response(JSON.stringify(result), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
        statusText: "OK",
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("未知错误");
      }
    }
  });
};
