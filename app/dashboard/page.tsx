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
        <div className="flex h-full gap-6">
            {/* Left: Input */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-semibold text-gray-700">Input Details</h2>
                </div>
                <form action={handleSubmit} className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Your Resume (Paste text)</label>
                        <textarea
                            name="resumeText"
                            className="w-full h-40 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                            placeholder="Paste your full resume here..."
                            required
                        />
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Job Description</label>
                        <textarea
                            name="jobDescription"
                            className="w-full flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                            placeholder="Paste the job description here..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className={cn(
                            "w-full py-3 px-4 rounded-lg text-white font-medium transition-all shadow-md mt-2",
                            isPending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:translate-y-[-1px]"
                        )}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </span>
                        ) : "Generate Cover Letter"}
                    </button>
                </form>
            </div>

            {/* Right: Output */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-700">Generated Letter</h2>
                    {generatedContent && (
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedContent)}
                            className="text-xs text-blue-600 hover:underline"
                        >
                            Copy to Clipboard
                        </button>
                    )}
                </div>
                <div className="flex-1 p-6 overflow-y-auto bg-white prose prose-blue max-w-none">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {!generatedContent && !isPending && !error && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p>Generated content will appear here.</p>
                        </div>
                    )}
                    {isPending && !generatedContent && (
                        <div className="flex flex-col items-center justify-center h-full text-blue-500 animate-pulse">
                            <p>Analyzing job requirements...</p>
                        </div>
                    )}
                    {generatedContent && (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans">
                            {generatedContent}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
