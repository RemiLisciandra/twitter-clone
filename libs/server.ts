import {NextApiRequest, NextApiResponse} from 'next';

import prisma from '@/libs/prisma';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {getServerSession} from 'next-auth';

const server = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        throw new Error('Utilisateur non connecté');
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
    if (!existingUser) {
        throw new Error('Utilisateur non connecté');
    }

    return {existingUser};
};

export default server;