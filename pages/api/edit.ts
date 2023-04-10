import {NextApiRequest, NextApiResponse} from "next";
import server from "../../libs/server";
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).end();
    }
    try {
        const {userAuth} = await server(req, res);
        const {lastname, firstname, username, bio, profileImage, coverImage} = req.body;
        if (!lastname || !firstname || !username) {
            return res.status(400).json({ error: "Le nom, le prénom et le nom d'utilisateur sont des champs obligatoires" });
        }
        if (lastname !== lastname.toUpperCase()) {
            return res.status(400).json({ error: "Le nom de famille doit être en majuscules" });
        }
        if (firstname.charAt(0) !== firstname.charAt(0).toUpperCase()) {
            return res.status(400).json({ error: "La première lettre du prénom doit être en majuscules" });
        }
        if(bio && bio.length > 50) {
            return res.status(400).json({ error: "La description est trop grande, 50 caractères maximum" });
        }
        const userUpdated = await prisma.user.update({
            where: {
                id: userAuth.id
            },
            data: {
                lastname,
                firstname,
                username,
                bio,
                profileImage,
                coverImage
            }
        });
        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).end();
    }
};