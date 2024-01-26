"use client";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { IconBrandGithub } from "@tabler/icons-react";

const SignInGithub = () => {
  return (
    <Button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      type="button"
      size="lg"
      variant="ghost"
      color="primary"
    >
      <IconBrandGithub />Sign In With GitHub
    </Button>
  );
};

export default SignInGithub;