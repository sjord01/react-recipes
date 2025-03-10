import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, code } = req.body;

        try {
            const newBlock = await db.block.create({
                data: {
                    title,
                    code,
                },
            });

            res.status(201).json(newBlock);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create block' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}