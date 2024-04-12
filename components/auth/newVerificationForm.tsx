"use client";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FormError, FormSuccess } from "./formMessage";
import { BeatLoader } from "react-spinners";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => setError("Something went wrong!"));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Confirming your verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!success && !error && (
          <div className="w-full flex justify-center my-5">
            <BeatLoader color="white" />
          </div>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
      </CardContent>
      <CardFooter>
        <Link
          className={`${buttonVariants({ variant: "outline" })} w-full`}
          href={"/auth/login"}
        >
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
}
