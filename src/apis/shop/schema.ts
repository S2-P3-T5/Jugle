import { z } from "zod";

import {
  hrefSchema,
  linksSchema,
  noticeSchema,
  shopSchema,
} from "@/apis/schema";

export const noticesPostResponseSchema = z
  .object({
    item: noticeSchema.merge(
      z.object({ shop: z.object({ item: shopSchema }).merge(hrefSchema) }),
    ),
  })
  .merge(linksSchema);

export type NoticesPostResponse = z.infer<typeof noticesPostResponseSchema>;

export type NoticesPostRequestBody = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};
