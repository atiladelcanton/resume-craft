import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db/drizzle"
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google],
    adapter: DrizzleAdapter(db),
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        }
    }
})