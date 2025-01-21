"use client";
import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog"
import { InputFIeld } from "@/components/ui/input/field";
import { Toaster } from "@/components/ui/sonner";
import { createResume } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    title: string;
}
export const NewResumeDialog = (props: BaseDialogProps) => {
    const methods = useForm<FormData>();
    const routes = useRouter();

    const { mutate: handleCreateResume, isPending } = useMutation({
        mutationFn: createResume,
        onSuccess: (resume) => {
            toast.success("Curriculo cadastrado com sucesso!");
            routes.push(`/dashboard/resumes/${resume.id}`)
        },
        
    })


    const onSUbmit = async (data: FormData) => {
        handleCreateResume(data.title)
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
                        <Button type="submit" className="w-max mt-6 ml-auto" disabled={isPending}>
                            Criar
                        </Button>
                    </form>
                </FormProvider>
            }
        />
    )
}