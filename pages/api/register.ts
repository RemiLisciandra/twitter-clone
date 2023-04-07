import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from "next";
import prisma from '../../libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    try {
        const {lastname, firstname, username, email, password} = req.body;
        if (lastname !== lastname.toUpperCase()) {
            return res.status(400).json({ error: "Le nom de famille doit être en majuscules" });
        }
        if (firstname.charAt(0) !== firstname.charAt(0).toUpperCase()) {
            return res.status(400).json({ error: "La première lettre du prénom doit être en majuscules" });
        }
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "L'adresse mail est invalide" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                lastname,
                firstname,
                username,
                email,
                hashedPassword
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).end();
    }
}