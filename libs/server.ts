import {NextApiRequest} from "next";
import {getSession} from "next-auth/react";
import prisma from "../libs/prisma";
import {User} from ".prisma/client";

const server = async (req: NextApiRequest) => {
    const session = await getSession({req});
    if (!session?.user?.email) {
        throw new Error("L'utilisateur n'est pas authentifié ou l'adresse e-mail est manquante");
    }

    const currentUser: User | null = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!currentUser) {
        throw new Error("L'adresse mail inexistante");
    }
    return {currentUser};
};

export default server;