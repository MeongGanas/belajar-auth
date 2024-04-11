import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Oops!</CardTitle>
          <CardDescription>Something went wrong while login.</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Link
            href={"/auth/login"}
            className={buttonVariants({ variant: "outline" })}
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
