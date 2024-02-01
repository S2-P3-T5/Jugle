export const PAGE_ROUTES = {
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  SHOPS: "/shops",
  NOTICES: "/notices",
  SHOPS_REGISTER: "/shops/register",
  parseShopsURL: (shopId: string) => `/shops/${shopId}`,
  parseShopsEditURL: (shopId: string) => `/shops/edit/${shopId}`,
  parseNoticeRegisterURL: (shopId: string) =>
    `/shops/${shopId}/notices/register`,
};

export const API_ROUTE = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const apiRouteUtils = {
  USERS: "users",
  SHOPS: "shops",
  TOKEN: "token",
  IMAGES: "images",
  parseShopNoticesURL: (shopId: string) => `shops/${shopId}/notices`,
  parseShopsURL: (shopId: string) => `shops/${shopId}`,
  parseShopNoticeDetail: (shopId: string, noticeId: string) =>
    `shops/${shopId}/notices/${noticeId}`,
};
