// auth/lucia.ts
import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const auth = lucia({
	env: "DEV", // "PROD" if deployed to HTTPS
	middleware: nextjs_future(),
	sessionCookie: {
		expires: false
	},
	adapter: prisma(client),

	getUserAttributes: (data) => {
		return {
			githubUsername: data.username
		};
	}
});

export const githubAuth = github(auth, {
	clientId: process.env.GITHUB_CLIENT_ID ?? "",
	clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
});

export type Auth = typeof auth;
