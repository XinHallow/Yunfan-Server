import { Router } from "@oak/oak/router";
import root from "./root-page.ts";
import homework from "./homework.ts";
import file from "./file.ts";
import random from "./random.ts";
import toolkit from "./toolkit.ts";

export { default as rootRouter } from "./root-page.ts";
export { default as homeworkRouter } from "./homework.ts";
export { default as fileRouter } from "./file.ts";
export { default as randomRouter } from "./random.ts";
export { default as toolkitRouter } from "./toolkit.ts";

export default [
  root,
  homework,
  file,
  random,
  toolkit,
] as Router[];

export const name = "router";
export const version = "0.0.1";