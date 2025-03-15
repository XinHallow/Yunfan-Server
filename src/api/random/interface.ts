import { object, array, number } from "@superstruct";

export interface requestBody {
  max: number;
  min: number;
  count: number;
  exclude: number[];
}

export const struct = object({
  min: number(),
  max: number(),
  count: number(),
  exclude: array(number()),
});
