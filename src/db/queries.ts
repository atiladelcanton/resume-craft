"use server";

import { auth } from "@/lib/auth";
import { db } from "./drizzle";
import { resumes } from "./schema";
import { cache } from "react";
import { desc, eq } from "drizzle-orm";
import { ResumeDto } from "./types";


export const getResumes = cache(async (): Promise<ResumeDto[]> => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Usuario nao encontrado");

    const userResumes = await db
    .query.resumes.findMany({
        where:eq(resumes.userId,userId),
        orderBy:[desc(resumes.updatedAt)],
    })

    return userResumes;
});

export const getResumeById = cache(async (id: string): Promise<ResumeDto | undefined> => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Usuario nao encontrado");

    const resume = await db
        .query.resumes.findFirst({
            where: eq(resumes.id, id),
        });

    return resume;
});