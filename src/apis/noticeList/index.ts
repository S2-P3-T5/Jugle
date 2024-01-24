import { fetcher } from "@/apis/fetcher";
import { apiRouteUtils } from "@/routes";

export const getNoticeList = async ({}: any): Promise<any> =>
  await fetcher.get(apiRouteUtils.NOTICES);

// export const getNoticeList = async ({
//   email,
//   password,
//   type,
// }: any): Promise<any> =>
//   await fetcher
//     .get(apiRouteUtils.NOTICES, {
//       json: {
//         email,
//         password,
//         type,
//       },
//     })
//     .json()
//     .then(usersResponseSchema.parse)
//     .then()
//     .then((res) => res.item)
//     .catch((err: HTTPError) => {
//       throw err;
//     });
