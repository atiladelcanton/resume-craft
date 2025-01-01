import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
    label: string;
    name: string;
    children: ReactNode;
    className?: string;
    error?: FieldError;
}

export const FieldWrapper = ({ label, name, children, className, error }: FieldWrapperProps) => {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label htmlFor={name}>{label}</Label>
            {children}
            {error && (
                <p className="text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
};