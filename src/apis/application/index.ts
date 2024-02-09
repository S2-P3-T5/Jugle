import {
  ApplicationGetResponse,
  applicationsGetResponseSchema,
} from "@/apis/application/schema";
import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

export const getApplicationList = (
  userId: string,
): Promise<ApplicationGetResponse> =>
  fetcher
    .get(apiRouteUtils.parseApplicationsURL(userId))
    .json()
    .then(applicationsGetResponseSchema.parse)
    .catch((err) => {
      throw err;
    });
