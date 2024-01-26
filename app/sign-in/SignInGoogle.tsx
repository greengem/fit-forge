"use client";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { IconBrandGoogle } from "@tabler/icons-react";

const SignInGoogle = () => {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      type="button"
      size="lg"
      variant="ghost"
      color="primary"
    >
      <IconBrandGoogle />Sign In With Google
    </Button>
  );
};

export default SignInGoogle;