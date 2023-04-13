import { NextApiRequest, NextApiResponse } from "next";
import server from "../../libs/server";
import prisma from "../../libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { userAuth } = await server(req, res);
        const { body } = req.body;
        const { postId } = req.query;

        if (!postId || typeof postId !== 'string') {
            return res.status(400).end();
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: userAuth.id,
                postId
            }
        });

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            });

            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: 'Vous avez répondu à ce tweet',
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
        }
        catch (error) {
            return res.status(400).end();
        }
        return res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}