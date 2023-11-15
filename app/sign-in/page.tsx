import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/authOptions";
import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import SignInGithub from "./SignInGithub";
import SignInGoogle from "./SignInGoogle";
import { IconBarbell } from "@tabler/icons-react"
import { Button } from "@nextui-org/button";

export default async function CustomSignInPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard");
      } else {
        return (
            <div className="flex justify-center items-center h-screen">
                <Card className="max-w-lg w-[320px] shadow-lg" shadow="none">
                    <CardHeader className="bg-default-100 gap-x-1 px-5 py-3">
                        <IconBarbell stroke={1} size={40} className="dark:text-success" />
                        <h3 className="text-2xl tracking-tight">Tracktive</h3>
                    </CardHeader>
                    <CardBody className="space-y-4 p-5">
                        <p className="uppercase text-xs text-gray-500 text-center">- OAuth- </p>
                        <SignInGoogle />
                        <SignInGithub />
                        <Divider />
                        <p className="uppercase text-xs text-gray-500 text-center">- Email- </p>
                        <form>
                            <Input size="sm" label="Email" type="email" />
                            <Input size="sm" label="Password" type="password" />
                            <Button size="lg" variant="ghost">Sign In with email</Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        );
      }
}
