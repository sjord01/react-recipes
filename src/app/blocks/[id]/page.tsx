import { db } from '@/db';
import { notFound } from 'next/navigation';

interface Block {
    id: number;
    title: string;
    code: string;
}

async function findBlock(id: number): Promise<Block | null> {
    const block = await db.block.findUnique({
        where: { id },
    });
    return block || null;
}

interface BlockShowPageProps {
    params: {
        id: string;
    };
}

export default async function BlockShowPage(props: BlockShowPageProps) {
    const block = await findBlock(parseInt(props.params.id));

    if (!block) {
        return notFound();
    }

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{block.title}</h1>
                <div className="flex gap-4">
                    <button className="p-2 border rounded">Edit</button>
                    <button className="p-2 border rounded">Delete</button>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{block.code}</code>
      </pre>
        </div>
    );
}