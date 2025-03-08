import randomSpecial from "./random-special.ts";
import random from "./random.ts";
import file from "./file.ts";

interface Handlers {
  [key: string]: (req: Request) => Promise<Response>;
}

export default {
  random: random,
  randomSpecial: randomSpecial,
  file: file,
} as Handlers;
