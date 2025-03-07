import randomInt from "./random-int.ts";

interface Generator {
  randomInt: (
    min: number,
    max: number,
    count: number,
    exclude: number[]
  ) => number[];
}

export default {
  randomInt: randomInt,
} as Generator;
