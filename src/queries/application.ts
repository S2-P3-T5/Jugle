import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { getApplicationList } from "@/apis/application";
import { UserContext } from "@/providers/UserProvider";

export const useApplicationListQuery = () => {
  const user = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["application", user?.id],
    queryFn: () => getApplicationList(user!.id),
    enabled: !!user,
  });

  return { data, isLoading, error };
};
