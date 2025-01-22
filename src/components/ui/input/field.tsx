"use client";
import { ComponentProps, ReactNode } from "react"
import { Control, Controller, useFormContext } from "react-hook-form"
import { Input } from "."
import { FieldWrapper } from "../field-wrapper";

type InputFieldProps = ComponentProps<typeof Input> & {
    label: string;
    name: string;
    containerClassName?: string;
    extraContent?: (value: string) => ReactNode;
    control?: Control<any, any>;
}

export const InputFIeld = ({ label, name, required, containerClassName, extraContent, control: customControl, ...props }: InputFieldProps) => {
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
                    error={fieldState?.error}>

                    <Input {...field} {...props} />
                    {extraContent && extraContent(field.value)}

                </FieldWrapper>
            )}
        />
    )
}