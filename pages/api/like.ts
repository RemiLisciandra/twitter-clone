import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../libs/prisma';
import server from "../../libs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { postId } = req.body;

        const { userAuth } = await server(req, res);

        if (!postId || typeof postId !== 'string') {
            return res.status(400).end();
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return res.status(400).end();
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if (req.method === 'POST') {
            updatedLikedIds.push(userAuth.id);

            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    }
                });

                if (post?.userId) {
                    await prisma.notification.create({
                        data: {
                            body: 'Le tweet a été aimé',
                            userId: post.userId
                        }
                    });

                    await prisma.user.update({
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true
                        }
                    });
                }
            } catch(error) {
                return res.status(400).end();
            }
        }

        if (req.method === 'DELETE') {
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== userAuth?.id);
        }

        const postUpdated = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return res.status(200).json(postUpdated);
    } catch (error) {
        return res.status(400).end();
    }
}