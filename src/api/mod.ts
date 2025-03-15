import { ApiBase } from "./base.ts";
import file from "./file.ts";
import randomSpecial from "./random/special.ts";
import randomNormal from "./random/normal.ts";

export const apis: {
  [key: string]: ApiBase;
} = {
  file: file,
  randomSpecial: randomSpecial,
  randomNormal: randomNormal,
};
