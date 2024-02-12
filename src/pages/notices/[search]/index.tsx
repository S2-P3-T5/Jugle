import { useContext } from "react";

import EmployeeLayout from "@/components/common/EmployeeLayout";
import EmployerLayout from "@/components/common/EmployerLayout";
import SearchedNoticesLists from "@/components/notices/SearchedNoticeLists";
import { UserContext } from "@/providers/UserProvider";

export default function Notices() {
  const user = useContext<any>(UserContext);
  const Layout = user?.type === "employer" ? EmployerLayout : EmployeeLayout;

  return (
    <>
      <Layout>
        <SearchedNoticesLists />
      </Layout>
    </>
  );
}
