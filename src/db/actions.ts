"use server";

import { auth } from "@/lib/auth";
import { db } from "./drizzle";
import { resumes } from "./schema";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const createResume = async (title: string) => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Usuario nao encontrado");

    const newResume = await db
        .insert(resumes)
        .values({ title, userId })
        .returning();
    revalidatePath("/dashboard/resumes");
    return newResume[0];
}
