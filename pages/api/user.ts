import {NextApiRequest, NextApiResponse} from "next";
import server from "../../libs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const {existingUser} = await server(req);
        return res.status(200).json(existingUser);
    } catch (error) {
        console.log("Erreur : " + error);
        return res.status(400).end();
    }
}