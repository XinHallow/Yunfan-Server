import { object, array, string } from "@superstruct";

// Request body interface for get
export interface GetRequestBody {
  date: string;
}

// Request body interface for set
export interface SetRequestBody {
  date: string;
  content: {
    chinese: string[];
    math: string[];
    english: string[];
  };
}

// Request body for set
export const SetStruct = object({
  date: string(),
  content: object({
    chinese: array(string()),
    math: array(string()),
    english: array(string()),
  }),
});

// Request body for get
export const GetStruct = object({
  date: string(),
});
