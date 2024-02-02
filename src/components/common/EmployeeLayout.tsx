import { PropsWithChildren } from "react";

import EmployeeHeader from "@/components/common/EmployeeHeader";

export default function EmployeeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <EmployeeHeader />
      <main className="h-[calc(100dvh-64px)]">{children}</main>
    </>
  );
}
