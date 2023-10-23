import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import prisma from '@/db/prisma';
import GitHubProvider from "next-auth/providers/github";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ user, token }) => {
    if (user) {
        token.uid = user.id;
    }
    return token;
},
session: async ({ session, token }) => {
    if (session?.user) {
        (session.user as any).id = token.uid;
    }
    return session;
}

    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
};
