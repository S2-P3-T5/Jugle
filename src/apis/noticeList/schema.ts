import { z } from "zod";

import {
  hrefSchema,
  linksSchema,
  noticeSchema,
  paginationSchema,
  shopSchema,
} from "@/apis/schema";

export const noticesResponseSchema = z
  .object({
    items: z.array(
      z
        .object({
          item: z
            .object({
              shop: z.object({ item: shopSchema }).merge(hrefSchema),
            })
            .merge(noticeSchema),
        })
        .merge(linksSchema),
    ),
  })
  .merge(paginationSchema)
  .merge(
    z.object({
      address: z.string().array(),
      keyword: z.string().optional(),
    }),
  );
