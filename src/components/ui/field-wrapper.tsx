import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FieldWrapperProps = {
    label: string;
    name: string;
    children: ReactNode;
    className?: string;
}

export const FieldWrapper = ({ label, name, children, className }: FieldWrapperProps) => {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label htmlFor={name}>{label}</Label>
            {children}
        </div>
    )
};