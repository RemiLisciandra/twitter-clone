import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { userId } = req.query;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).end();
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false,
            }
        });

        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(400).end();
    }
}