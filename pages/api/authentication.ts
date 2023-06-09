import { NextApiRequest, NextApiResponse } from 'next';
import server from '../../libs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try {
        const { userAuth } = await server(req, res);
        return res.status(200).json(userAuth);
    } catch (error) {
        return res.status(200).json(null);
    }
}