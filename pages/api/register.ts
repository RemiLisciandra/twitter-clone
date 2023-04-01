import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { lastname, firstname, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}