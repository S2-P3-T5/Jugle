import { TokenDTO, TokenResponse, UserDTO } from "@/apis/auth/schema";
import { fetcher } from "@/apis/fetcher";
import { User } from "@/types/user";

export const extractTokenDTOFromResponse = (res: TokenResponse): TokenDTO => {
  const {
    item: { token, user },
  } = res;
  const { item: userDTO } = user;

  return {
    token,
    user: userDTO,
  };
};

export const mapUserDTOToUser = (udto: UserDTO): User => ({
  id: udto.id,
  email: udto.email,
  type: udto.type,
});

export const setAccessTokenInHeader = (token: string) => {
  fetcher.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeAccessToken = () => {
  fetcher.extend({
    headers: {
      Authorization: undefined,
    },
  });
};
