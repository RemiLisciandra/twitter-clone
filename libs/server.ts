import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '@/libs/prisma';
import {authOptions} from '@/pages/api/auth/[...nextauth]';
import {getServerSession} from 'next-auth';

const server = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        throw new Error();
        // return res.status(400).json({ error: "Aucune session trouvée ou l'email de utilisateur est manquant" });
    }
    const userAuth = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
    if (!userAuth) {
        //return res.status(400).json({ error: "Echec de l'authentification" });
        throw new Error();
    }
    return {userAuth};
};

export default server;