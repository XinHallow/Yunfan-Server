type ContentType = {
  [key: string]: string;
};

// 快速获取Content-Type
const contentType: ContentType = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
};

export default contentType;