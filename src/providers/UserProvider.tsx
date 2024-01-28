import { createContext, PropsWithChildren, useState } from "react";

import { User } from "@/types/user";

const UserContext = createContext<User | null>(null);
const UserActionContext = createContext({
  login: (user: User) => {},
  logout: () => {},
});

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={user}>
      <UserActionContext.Provider value={{ login, logout }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
}
