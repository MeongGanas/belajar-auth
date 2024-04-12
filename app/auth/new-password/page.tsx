import NewPasswordForm from "@/components/auth/newPasswordForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
}
