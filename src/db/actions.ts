"use server";

import { auth } from "@/lib/auth";
import { db } from "./drizzle";
import { resumes, users } from "./schema";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const getUserOrThrow = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Usuario nao encontrado");
    return userId;
}

export const createResume = async (title: string) => {
    const userId = await getUserOrThrow();

    const newResume = await db
        .insert(resumes)
        .values({ title, userId })
        .returning();
    revalidatePath("/dashboard/resumes");
    return newResume[0];


}

export const updateResume = async (id: string, data: ResumeData) => {
    const userId = await getUserOrThrow();

    const updatedResume = await db
        .update(resumes)
        .set({ data, updatedAt: new Date() })
        .where(eq(resumes.id, id))
        .returning();
    revalidatePath("/dashboard/resumes");
    return updatedResume[0];
}

export const deleteResume = async (id: string) => {
    const userId = await getUserOrThrow();

    const resume = await db.query.resumes.findFirst({ where: eq(resumes.id, id) })
    if (!resume) throw new Error("Curriculo nao encontrado");
    if (resume.userId !== userId) throw new Error("Usuario nao autorizado");

    await db.delete(resumes).where(eq(resumes.id, id)).execute();
    revalidatePath("/dashboard/resumes");
}

export const duplicateResume = async (id: string, title: string) => {
    const userId = await getUserOrThrow();

    const resume = await db.query.resumes.findFirst({ where: eq(resumes.id, id) });
    if (!resume) throw new Error("Curriculo nao encontrado");
    if (resume.userId !== userId) throw new Error("Usuario nao autorizado");

    const duplicatedResume = await db
        .insert(resumes)
        .values({ title, userId, data: resume.data })
        .returning();
    revalidatePath("/dashboard/resumes");
    return duplicatedResume[0];
}

export const decrementUserCredits = async (amount: number) => {
    const userId = await getUserOrThrow();

    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (!user) throw new Error("Usuario nao encontrado");


    const updatedUser = await db
        .update(users)
        .set({ credits: user.credits - amount })
        .where(eq(users.id, userId))
        .returning();
    return updatedUser[0];
}