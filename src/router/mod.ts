import { Router } from "@oak/oak/router";
import root from "./root-page.ts";
import homework from "./homework.ts";
import file from "./file.ts";
import random from "./random.ts";
import toolkit from "./toolkit.ts";

export const rootRouter: Router = root;
export const homeworkRouter: Router = homework;
export const fileRouter: Router = file;
export const randomRouter: Router = random;
export const toolkitRouter: Router = toolkit;

export default [
  rootRouter,
  homeworkRouter,
  fileRouter,
  randomRouter,
  toolkitRouter,
];
