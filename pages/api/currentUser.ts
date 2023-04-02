import {NextApiRequest, NextApiResponse} from "next";
import server from "../../libs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const {currentUser} = await server(req);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log("Erreur : " + error);
    }
}