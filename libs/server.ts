import {NextApiRequest} from "next";
import {getSession} from "next-auth/react";
import prisma from "../libs/prisma";

const server = async (req: NextApiRequest) => {
    const session = await getSession({req});
    if (!session?.user?.email) {
        throw new Error("L'utilisateur n'est pas authentifié ou l'adresse e-mail est manquante");
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!existingUser) {
        throw new Error("L'adresse mail inexistante");
    }
    return {existingUser};
};

export default server;