import { Application } from "@oak/oak/application";
import { log } from "./utils/mod.ts";
import { errorMiddleware, logMiddleware } from "./middleware/mod.ts";
import { applicationConfig } from "./config/mod.ts";

// 路由
import routers from "./router/mod.ts";

// 创建应用实例
const app = new Application();

// 添加中间件
app.use(logMiddleware);
app.use(errorMiddleware);

// 添加路由
routers.forEach((router) => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

// 监听端口
app.listen({ port: applicationConfig.port });
log("server", `服务器在 ${applicationConfig.port} 端口启动`, "info");
