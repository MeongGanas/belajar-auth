"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function GoogleBtn() {
  const action = () => {
    signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <Button
      variant="outline"
      className="w-full mt-5 flex gap-2 items-center"
      onClick={action}
    >
      <FcGoogle className="w-6 h-6" /> Login with Google
    </Button>
  );
}
