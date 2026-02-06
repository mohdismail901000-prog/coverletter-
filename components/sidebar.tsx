import Link from "next/link";
import { db } from "@/db";
import { coverLetters } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function Sidebar() {
    const { userId } = auth();
    if (!userId) return null;

    const history = await db
        .select()
        .from(coverLetters)
        .where(eq(coverLetters.userId, userId))
        .orderBy(desc(coverLetters.createdAt));

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 pt-16">
            <div className="p-4 border-b border-gray-100">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    History
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {history.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                        No letters yet.
                    </p>
                ) : (
                    history.map((letter) => (
                        <Link
                            key={letter.id}
                            href={`/dashboard?id=${letter.id}`}
                            className="block p-3 text-sm rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition truncate"
                        >
                            <span className="font-medium text-gray-700 block truncate">
                                {letter.jobDescription.slice(0, 30)}...
                            </span>
                            <span className="text-xs text-gray-500">
                                {new Date(letter.createdAt).toLocaleDateString()}
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </aside>
    );
}
