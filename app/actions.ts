"use server";

import { openai, MODEL_NAME } from "@/lib/ai";
import { db } from "@/db";
import { coverLetters } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateCoverLetter(_prevState: unknown, formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        return { error: "Unauthorized" };
    }

    const jobDescription = formData.get("jobDescription") as string;
    const resumeText = formData.get("resumeText") as string;

    if (!jobDescription || !resumeText) {
        return { error: "Missing fields" };
    }

    try {
        const prompt = `
    You are an expert career coach. Write a compelling, unique cover letter based on the following:
    
    RESUME:
    ${resumeText}

    JOB DESCRIPTION:
    ${jobDescription}

    Return ONLY the cover letter content in structured Markdown format. Do not include introductory text like "Here is your cover letter".
    `;

        const completion = await openai.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: "You are a helpful expert career coach." },
                { role: "user", content: prompt },
            ],
        });

        const generatedText = completion.choices[0]?.message?.content || "";

        // Save to DB
        await db.insert(coverLetters).values({
            userId,
            jobDescription,
            resumeText,
            generatedText,
        });

        revalidatePath("/dashboard");

        return { success: true, generatedText };
    } catch (error) {
        console.error("Error generating letter:", error);
        return { error: "Failed to generate letter" };
    }
}
