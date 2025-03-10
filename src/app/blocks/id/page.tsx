import { db } from '@/db';
import { notFound } from 'next/navigation';

interface Block {
    id: number;
    title: string;
    code: string;
}

async function findBlock(id: number): Promise<Block | null> {
    // Query the blocks array to find the block with the matching ID
    const block = db.blocks.find((block) => block.id === id);

    return block || null; // Return the block if found, otherwise return null
}

interface BlockShowPageProps {
    params: {
        id: string;
    };
}

export default async function BlockShowPage(props: BlockShowPageProps) {
    // Fetch the block using the findBlock function
    const block = await findBlock(parseInt(props.params.id));

    // If the block doesn't exist, show a 404 page
    if (!block) {
        return notFound(); // Render the not found page
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