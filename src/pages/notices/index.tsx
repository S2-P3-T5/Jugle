import { useContext } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import EmployerLayout from "@/components/common/EmployerLayout";
import NoticeListForm from "@/components/notices/NoticeListForm";
import { UserContext } from "@/providers/UserProvider";

export default function Notices() {
  const user = useContext(UserContext);
  return (
    <>
      {user?.type === "employer" ? (
        <EmployerLayout>
          <NoticeListForm />
        </EmployerLayout>
      ) : (
        <EmployeeLayout>
          <NoticeListForm />
        </EmployeeLayout>
      )}
    </>
  );
}
