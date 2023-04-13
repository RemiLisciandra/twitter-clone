import { NextApiRequest, NextApiResponse } from "next";

import prisma from '../../libs/prisma';
import server from "../../libs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { userId } = req.body;

        const { userAuth } = await server(req, res);

        if (!userId || typeof userId !== 'string') {
            return res.status(400).end();
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(400).end();
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId);

            try {
                await prisma.notification.create({
                    data: {
                        body: "Quelqu'un vient de s'abonner à votre compte",
                        userId,
                    },
                });

                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasNotification: true,
                    }
                });
            } catch (error) {
                return res.status(400).end();
            }

        }

        if (req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const userUpdated = await prisma.user.update({
            where: {
                id: userAuth.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).end();
    }
}