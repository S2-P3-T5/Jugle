import { HTTPError } from "ky";

import { fetcher } from "@/apis/fetcher";
import { apiResponseSchema } from "@/apis/noticeList/schema";
import { apiRouteUtils } from "@/routes";

export const getNoticeList = async () =>
  await fetcher
    .get(apiRouteUtils.NOTICES)
    .json()
    .then(apiResponseSchema.parse)
    .catch((err: HTTPError) => {
      throw err;
    });
