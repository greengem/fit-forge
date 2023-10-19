// app/login/page.tsx
import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import PageHeading from "@/components/PageHeading/PageHeading";
import Link from "next/link";

const Page = async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (session) redirect("/dashboard");
	return (
		<>
			<PageHeading title="Log in" />
			<Link href="/login/github">Sign in with GitHub</Link>
		</>
	);
};

export default Page;