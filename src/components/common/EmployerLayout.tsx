import { PropsWithChildren } from "react";

import EmployerHeader from "@/components/common/EmployerHeader";

export default function EmployerLayout({ children }: PropsWithChildren) {
  return (
    <>
      <EmployerHeader />
      {children}
    </>
  );
}
