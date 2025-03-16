// deno-lint-ignore-file no-unused-vars
"use strict";

async function random() {

  // 获取数值字符串
  const min = parseInt(document.querySelector("#min-value").value);
  const max = parseInt(document.querySelector("#max-value").value);
  const count = parseInt(document.querySelector("#count-value").value);

  // 处理排除数字
  let excludeString = document.querySelector("#exclude-value").value;
  excludeString = excludeString.replaceAll("，", ",");
  const exclude = JSON.parse(`[${excludeString}]`);

  // 检查参数
  if ([min, max, count].every((num) => isNaN(num))) {
    document.querySelector("#result").textContent = "请在输入框输入数字!";
    return;
  }

  exclude.every((value) => {
    if (isNaN(value) || typeof value !== "number") {
      document.querySelector("#result").textContent = "请在输入框输入数字!";
    }
  });

  // 向服务器发送随机数请求
  const url = new URL("https://localhost/api/v1/random/special");
  url.searchParams.set("min", min);
  url.searchParams.set("max", max);
  url.searchParams.set("count", count);
  url.searchParams.set("exclude", exclude.join(","));
  const fetchResult = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  const body = await fetchResult.json();
  if (body instanceof Array) {
    document.querySelector("#result").textContent = body.join(", ");
  } else {
    document.querySelector("#result").textContent = body.message;
  }
}
