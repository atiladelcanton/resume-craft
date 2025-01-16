"use client";
import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog"
import { InputFIeld } from "@/components/ui/input/field";
import { Toaster } from "@/components/ui/sonner";
import { createResume } from "@/db/actions";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    title: string;
}
export const NewResumeDialog = (props: BaseDialogProps) => {
    const methods = useForm<FormData>();
    const routes = useRouter();
    const onSUbmit = async (data: FormData) => {
        try {
            const resume = await createResume(data.title);
            toast.success("Curriculo cadastrado com sucesso!");
            routes.push(`/dashboard/resumes/${resume.id}`)
        } catch (error) {
            toast.error("Erro ao adicionar o curriculo");
        }
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