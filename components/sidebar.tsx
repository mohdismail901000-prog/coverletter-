import Link from "next/link";
import { db } from "@/db";
import { coverLetters } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function Sidebar() {
    const { userId } = await auth();
    if (!userId) return null;

    const history = await db
        .select()
        .from(coverLetters)
        .where(eq(coverLetters.userId, userId))
        .orderBy(desc(coverLetters.createdAt));

    return (
        <aside className="w-64 bg-black border-r border-white/5 h-screen flex flex-col fixed left-0 top-0 pt-16 z-20">
            <div className="p-6 border-b border-white/5">
                <h2 className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                    Logs / History
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center py-12 gap-2">
                        <div className="w-1 h-1 bg-gray-800 rounded-full" />
                        <p className="text-[9px] text-gray-700 uppercase tracking-widest text-center">
                            Empty buffer
                        </p>
                    </div>
                ) : (
                    history.map((letter) => (
                        <Link
                            key={letter.id}
                            href={`/dashboard?id=${letter.id}`}
                            className="group block p-4 rounded bg-white/0 border border-white/5 hover:bg-white/[0.02] hover:border-purple-500/30 transition-all"
                        >
                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-purple-400 block truncate uppercase tracking-wider mb-1">
                                {letter.jobDescription.slice(0, 20)}
                            </span>
                            <span className="text-[9px] text-gray-600 font-mono">
                                {new Date(letter.createdAt).toLocaleDateString().replace(/\//g, ".")} {/* TIME_STAMP */}
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </aside>
    );
}
