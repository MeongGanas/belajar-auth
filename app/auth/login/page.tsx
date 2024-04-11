import { SigninForm } from "@/components/auth/AuthForm";

export default function Page() {
  return (
    <main className="w-full min-h-screen p-5 flex items-center justify-center">
      <div className="min-w-96">
        <SigninForm />
      </div>
    </main>
  );
}
