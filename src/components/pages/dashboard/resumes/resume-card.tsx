import { cn } from "@/lib/utils";
import Link from "next/link"
import { ReactNode } from "react";

type ResumeCardButtonProps = {
    title: String;
    description: String;
    icon?: ReactNode
}
export const ResumeCardButton = ({ title, description, icon }: ResumeCardButtonProps) => {
    return (
        <button className={cn(
            "w-full h-[300px] bg-muted/50 rounded border",
            "border-muted-foreground/20 flex items-center justify-center relative",
            "outline-none overflow-hidden",
            "hover:brightness-105 dark:hover:brightness-125 transition-all",
        )}>
            {icon}
            <div>
                <p>{title}</p>
                <span>{description}</span>
            </div>
        </button>
    )
}
export const ResumeCard = () => {
    return (
        <Link href="/dashboard/resumes/example" className="block w-full">

        </Link>
    )
}