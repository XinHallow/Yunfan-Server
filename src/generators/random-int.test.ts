import randomInt from "./random-int.ts";
import { assertThrows } from "@std/assert";

Deno.test("检查是否能传入整数", () => {
  assertThrows(() => randomInt(0.1, 2, 1, []));
  assertThrows(() => randomInt(0, 2.1, 1, []));
  assertThrows(() => randomInt(0, 2, 1.1, []));
  assertThrows(() => randomInt(0, 2, 1, [1.1]));
});

Deno.test("检查错误传入参数", () => {
  assertThrows(() => randomInt(0, 2, 3, [0]));
  assertThrows(() => randomInt(2, 0, 3, [0]));
});
