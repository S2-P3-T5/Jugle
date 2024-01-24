import { useMutation } from "@tanstack/react-query";

import { getNoticeList } from "@/apis/noticeList";

export const useNoticeList = () => {
  const mutation = useMutation({
    mutationFn: ({}: any) => getNoticeList({}),
    onSuccess: () => {
      alert("test");
    },
  });

  return mutation;
};
