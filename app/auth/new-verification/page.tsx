import NewVerificationForm from "@/components/auth/newVerificationForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
}
