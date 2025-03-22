/**
 * 从路径中匹配日期
 * @param pathname 路径名称, 如 /foo/:date
 * @returns 匹配到的日期
 * @warning 匹配到的月份和日期前面可能有0
 */
export const matchTimeFromPathname = (
  pathname: string,
  requestPathname: string,
): null | { year: string; month: string; day: string } => {
  // 没有 `:date` 则不匹配
  if (!pathname.includes(":date")) {
    return null;
  }

  // 去掉开头和结尾的 `\`
  pathname = pathname.replace(/^\//, "");
  pathname = pathname.replace(/\/$/, "");
  pathname = pathname.replace(/\/:date$/, "");
  pathname = pathname.split("/").join("\/");

  requestPathname = requestPathname.replace(/\/$/, "");
  // 匹配日期
  const exp = new RegExp(
    `\/${pathname}\/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})`,
  );
  const match = exp.exec(requestPathname);
  if (!match) {
    return null;
  }
  const { year, month, day } = match.groups as {
    year: string;
    month: string;
    day: string;
  };

  // 转换为数字
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  const dayNum = parseInt(day);

  // 验证日期
  if (
    yearNum < 1970 ||
    yearNum > 9999 ||
    monthNum < 1 ||
    monthNum > 12 ||
    dayNum < 1 ||
    dayNum > 31
  ) {
    return null;
  }

  return { year, month, day };
};
