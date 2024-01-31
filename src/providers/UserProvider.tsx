import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { fetcher } from "@/apis/fetcher";
import { getUser } from "@/apis/user";
import { getAccessTokenInStorage } from "@/helpers/auth";
import { User } from "@/types/user";

export const UserContext = createContext<User | null>(null);
export const UserActionContext = createContext({
  login: (user: User) => {},
  logout: () => {},
});

export type JWTPayload = {
  userId: string;
};

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const token = getAccessTokenInStorage();
  fetcher.setAccessToken(token);
  let userId = "";
  try {
    userId = jwtDecode<JWTPayload>(token ?? "").userId;
  } catch (err) {}
  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!data) return;

    login(data.user);
  }, [userId, data]);

  return (
    <UserContext.Provider value={user}>
      <UserActionContext.Provider value={{ login, logout }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
}
