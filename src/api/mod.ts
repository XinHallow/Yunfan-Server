import random from "./random.ts";

interface Handlers {
  [key: string]: (req: Request) => Promise<Response>;
}

export default {
  random: random,
} as Handlers;
