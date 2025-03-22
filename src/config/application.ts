import { join } from "@std/path/join";
import { log } from "../utils/mod.ts";

const loggerName = "config-reader";

// 初始化默认的主要应用配置
const applicationConfig: {
  port: number;
} = {
  port: 80,
};

// 尝试读取主要应用配置
log(loggerName, "开始读取应用配置", "info");
try {
  const config = JSON.parse(
    Deno.readTextFileSync(join(".", "config", "application.json")),
  );

  // 检查端口
  if (
    !Number.isInteger(config["port"]) ||
    config["port"] < 1 ||
    config["port"] > 65535 ||
    config["port"] % 1 !== 0
  ) {
    log(loggerName, `请确保端口号为有效整数, 且在1-65535之间`, "error");
  } else {
    log(loggerName, "完成读取端口", "info");
  }

  // 应用配置合并
  applicationConfig.port = config["port"];
} catch (err) {
  log(loggerName, "读取主要配置失败, 请确保主要配置文件存在", "error");
  log(loggerName, JSON.stringify(err), "error");
}

log(loggerName, "完成读取应用配置", "info");

// 导出主要应用配置
export default applicationConfig;
