import Link from 'next/link';
import { db } from '@/db';

export default async function Home() {
    // Fetch the blocks from the database
    const blocks = await db.block.findMany();

    const renderedBlocks = blocks.map((block) => {
        return (
            <Link
                key={block.id}
                href={`/blocks/${block.id}`}
                className="flex justify-between items-center p-2 border rounded"
            >
                <div>{block.title}</div>
            </Link>
        );
    });

    return (
        <div>
            <div className="flex m-2 justify-between items-center">
                <h1 className="text-xl font-bold">Blocks</h1>
                <Link href="/blocks/create" className="border p-2 rounded">
                    New
                </Link>
            </div>
            <div className="flex flex-col gap-2">{renderedBlocks}</div>
        </div>
    );
}