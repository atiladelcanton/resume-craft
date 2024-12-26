import { Label } from "@/components/ui/label"
import { ReactNode } from "react";

type FieldWrapperProps = {
    label: string;
    name:string;
    children: ReactNode;
}

export const FieldWrapper = ({ label,name, children }: FieldWrapperProps) => {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={name}>{label}</Label>
            {children}
        </div>
    )
};