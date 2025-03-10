"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlockCreatePage() {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Add the new block to the database
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, code }),
        });

        if (res.ok) {
            // Navigate back to the home page after successful creation
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
            <h3 className="text-2xl font-bold mb-6">Create a Block</h3>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="title">
                        Title
                    </label>
                    <input
                        name="title"
                        className="border rounded p-2 w-full"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        name="code"
                        className="border rounded p-2 w-full"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Create
                </button>
            </div>
        </form>
    );
}