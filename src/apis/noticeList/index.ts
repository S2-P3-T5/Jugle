import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import { noticesResponseSchema } from "@/apis/noticeList/schema";
import { apiRouteUtils } from "@/routes";

export const getNoticeList = async () =>
  await fetcher
    .get(apiRouteUtils.NOTICES)
    .json()
    .then(noticesResponseSchema.parse)
    .catch((err: HTTPError) => {
      throw err;
    });
