"use client";
import { ComponentProps } from "react"
import { Control, Controller, useFormContext } from "react-hook-form"

import { FieldWrapper } from "../field-wrapper";
import { Editor } from ".";

type EditorFieldProps = {
    label: string;
    name: string;
    containerClassName?: string;
    required?: boolean;
    control?: Control<any, any>;

}

export const EditorField = ({ label, name, required, containerClassName, control: customControl, ...props }: EditorFieldProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={customControl ?? control}
            name={name}
            rules={({
                required: required && "Campo obrigatório",

            })}
            render={({ field, fieldState }) => (
                <FieldWrapper
                    label={label}
                    name={name}
                    className={containerClassName}
                    error={fieldState?.error}
                >
                    <Editor {...field} {...props} />

                </FieldWrapper>
            )}
        />
    )
}