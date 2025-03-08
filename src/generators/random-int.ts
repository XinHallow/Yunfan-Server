/**
 * 根据设置生成随机整数数组
 * @param min 最小值(>0)
 * @param max 最大值(>0)
 * @param count 生成个数(>0)
 * @param exclude 排除的值
 * @returns 生成出的不包含重复数字的数组
 */
export default (
  min: number,
  max: number,
  count: number,
  exclude: number[],
): number[] => {
  // 检查传入的参数
  if (min > max) {
    throw new Error("最小值必须大于最大值");
  }
  if (count <= 0) {
    throw new Error("生成个数必须大于0");
  }

  // 检查传入的参数是否都是整数
  if (
    ![...exclude, min, max, count].every((num): boolean => {
      if (isNaN(num)) return false;
      if (!Number.isInteger(num)) return false;
      else return true;
    })
  ) {
    throw new Error("参数必须是整数");
  }

  // 生成可用数字列表
  const availableNumbers = [];
  for (let i = min; i <= max; i++) {
    if (!exclude.includes(i)) availableNumbers.push(i);
  }

  // 检查可用数字数量是否足够
  if (availableNumbers.length < count) {
    throw new Error("可用数字数量不足");
  }

  // 随机数字
  const randomNumbers: number[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    randomNumbers.push(availableNumbers[randomIndex]);
    availableNumbers.splice(randomIndex, 1);
  }

  return randomNumbers;
};
