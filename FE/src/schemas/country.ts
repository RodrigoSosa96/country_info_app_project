import { z } from "zod";

export const Country = z.object({
  countryCode: z.string(),
  name: z.string(),
});

export type CountryType = z.infer<typeof Country>;