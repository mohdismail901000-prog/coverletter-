"use client";

import { useState, useTransition } from "react";
import { generateCoverLetter } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const [isPending, startTransition] = useTransition();
    const [generatedContent, setGeneratedContent] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        setError("");
        setGeneratedContent("");

        startTransition(async () => {
            const result = await generateCoverLetter(null, formData);
            if (result.error) {
                setError(result.error);
            } else if (result.generatedText) {
                setGeneratedContent(result.generatedText);
            }
        });
    }

    return (
        <div className="flex h-full gap-8">
            {/* Left: Input */}
            <div className="flex-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 flex flex-col overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-sm" />
                        Input Pipeline
                    </h2>
                </div>
                <form action={handleSubmit} className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Source: User Resume</label>
                        <textarea
                            name="resumeText"
                            className="w-full h-44 p-4 rounded bg-black/50 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 outline-none transition-all text-xs leading-relaxed text-gray-300 placeholder:text-gray-700 font-mono"
                            placeholder="DROP RESUME CONTENT HERE..."
                            required
                        />
                    </div>
                    <div className="space-y-3 flex-1 flex flex-col">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Target: Job Description</label>
                        <textarea
                            name="jobDescription"
                            className="w-full flex-1 p-4 rounded bg-black/50 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 outline-none transition-all text-xs leading-relaxed text-gray-300 placeholder:text-gray-700 font-mono"
                            placeholder="DROP JOB DESCRIPTION HERE..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className={cn(
                            "w-full py-4 px-4 rounded text-xs uppercase font-bold tracking-[0.2em] transition-all shadow-lg active:translate-y-px",
                            isPending ? "bg-purple-900/50 text-purple-300 cursor-not-allowed border border-purple-500/30" : "bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/50"
                        )}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-3 w-3 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Synthesizing...
                            </span>
                        ) : "Execute Generation"}
                    </button>
                </form>
            </div>

            {/* Right: Output */}
            <div className="flex-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 flex flex-col overflow-hidden shadow-2xl">
                <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-teal-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-sm" />
                        Output Buffer
                    </h2>
                    {generatedContent && (
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedContent)}
                            className="text-[9px] uppercase tracking-widest text-gray-500 hover:text-white transition border border-white/10 px-2 py-1 rounded"
                        >
                            Export
                        </button>
                    )}
                </div>
                <div className="flex-1 p-8 overflow-y-auto bg-black/20 custom-scrollbar">
                    {error && (
                        <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded text-[10px] uppercase tracking-wider">
                            [ERROR] {error}
                        </div>
                    )}
                    {!generatedContent && !isPending && !error && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-700">
                            <p className="text-[10px] uppercase tracking-[0.4em]">Awaiting input pipeline execution...</p>
                        </div>
                    )}
                    {isPending && !generatedContent && (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 animate-[loading_2s_infinite]" style={{ width: '30%' }} />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-teal-500/60 animate-pulse font-bold">Inference in progress...</p>
                        </div>
                    )}
                    {generatedContent && (
                        <div className="text-[13px] leading-relaxed text-gray-300 font-mono whitespace-pre-wrap selection:bg-teal-500/30">
                            <span className="text-teal-500/40 mb-4 block text-[10px]">[BEGIN BUFFER]</span>
                            {generatedContent}
                            <span className="text-teal-500/40 mt-4 block text-[10px]">[END BUFFER]</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
