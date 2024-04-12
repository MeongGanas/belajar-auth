import { SignupForm } from "@/components/auth/registerForm";

export default function Page() {
  return (
    <main className="w-full p-5 min-h-screen flex items-center justify-center">
      <div className="min-w-96">
        <SignupForm />
      </div>
    </main>
  );
}
