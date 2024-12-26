"use client";
import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog"
import { InputFIeld } from "@/components/ui/input/field";
import { Controller, FormProvider, useForm } from "react-hook-form";

type FormData = {
    title: string;
}
export const NewResumeDialog = (props: BaseDialogProps) => {
    const methods = useForm<FormData>();
    const onSUbmit = (data: FormData) => {
        console.log(data);
    };
    return (
        <Dialog
            {...props}
            title="Criar novo curriculo"
            description="Para começar, escolha um titulo para o seu curriculo"
            content={
                <FormProvider {...methods}>
                    <form className="flex flex-col" onSubmit={methods.handleSubmit(onSUbmit)}>

                        <InputFIeld label="Titulo" name="title" required />
                        <Button type="submit" className="w-max mt-6 ml-auto">
                            Criar
                        </Button>
                    </form>
                </FormProvider>
            }
        />
    )
}