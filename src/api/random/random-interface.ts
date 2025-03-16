import { object, array, number } from "@superstruct";

// Request body interface
export interface RequestBody {
  max: number;
  min: number;
  count: number;
  exclude: number[];
}

// Request body
export const struct = object({
  min: number(),
  max: number(),
  count: number(),
  exclude: array(number()),
});
