import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '@/db/prisma';

export const authOptions = {
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
                session.user.id = token.uid;
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
