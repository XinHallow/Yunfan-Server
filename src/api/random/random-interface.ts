import { object, array, number } from "@superstruct";

export interface RequestBody {
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
