import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from 'next-auth/providers/twitter'
import {PrismaAdapter} from "@next-auth/prisma-adapter"
// import {PrismaClient} from '@prisma/client'
import prisma from "../../../lib/prismadb"

// const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: "2.0",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token, user}) {
            return {...session, user: {...user, ...session.user}}
        }
    }
})