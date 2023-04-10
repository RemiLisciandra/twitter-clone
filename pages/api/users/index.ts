import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../libs/prisma';
import server from "@/libs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try {
        const { userAuth } = await server(req, res);
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    email: userAuth.email
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.status(200).json(users);
    } catch(error) {
        return res.status(400).end();
    }
}