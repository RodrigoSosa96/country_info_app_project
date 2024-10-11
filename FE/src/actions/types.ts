import { type typeToFlattenedError } from "zod";

export type ActionResponse<T> =
  | { success: false; errors: string | typeToFlattenedError<T> }
  | { success: true; data: T }
  // | { success: true; data?: undefined };
