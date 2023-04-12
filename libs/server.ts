import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../libs/prisma';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {getServerSession} from 'next-auth';

const server = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        throw new Error("Aucune session trouvée ou l'email de utilisateur est manquant");
    }
    const userAuth = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
    if (!userAuth) {
        throw new Error("Echec de l'authentification");
    }
    return {userAuth};
};

export default server;