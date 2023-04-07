import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '@/libs/prisma';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {getServerSession} from 'next-auth';

const server = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        throw new Error('Aucune session trouvée ou email utilisateur non défini');
    }
    const authUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
    if (!authUser) {
        throw new Error("L'utilisateur authentifié n'a pas été trouvé dans la base de données");
    }
    return {authUser};
};

export default server;