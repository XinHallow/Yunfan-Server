import randomAPI from "./random.ts";

interface Handlers {
  [key: string]: (req: Request) => Promise<Response>;
}

export default {
  random: randomAPI,
} as Handlers;
