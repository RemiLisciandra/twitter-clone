import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prisma"

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Adresse mail', type: 'text' },
                password: { label: 'Mot de passe', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Une adresse mail et un mot de passe est requis');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Utilisateur inexistant ou mot de passe pas disponible');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Le mot de passe est incorrect');
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
});