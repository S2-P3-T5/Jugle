import Image from "next/image";
import Link from "next/link";

import SignupForm from "@/components/signup/SignupForm";
import DialogProvider from "@/providers/DialogProvider";
import { PAGE_ROUTES } from "@/routes";

export default function Page() {
  return (
    <DialogProvider>
      <section>
        <Link href={PAGE_ROUTES.NOTICES}>
          <Image
            src="/icons/logo.svg"
            alt="로고 이미지"
            width={248}
            height={48}
          />
        </Link>
        <SignupForm />
      </section>
    </DialogProvider>
  );
}
