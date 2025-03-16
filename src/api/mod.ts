import { ApiBase } from "./base.ts";
import file from "./file.ts";
import randomSpecial from "./random/special.ts";
import randomNormal from "./random/normal.ts";
import homeworkSet from "./homework/set.ts";
import homeworkGet from "./homework/get.ts";

export const apis: {
  [key: string]: ApiBase;
} = {
  file: file,

  // Random API
  randomSpecial: randomSpecial,
  randomNormal: randomNormal,

  // Homework API
  homeworkSet: homeworkSet,
  homeworkGet: homeworkGet,
};
