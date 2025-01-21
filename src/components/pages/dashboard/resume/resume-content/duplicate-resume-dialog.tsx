"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteResume, duplicateResume } from "@/db/actions";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    title: string;
}

export const DuplicateResumeDialog = (props: BaseDialogProps) => {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const methos = useForm<FormData>();
    const resumeId = params.id as string;
    const onSubmit = async (data: FormData) => {
        try {
           const newResume = await duplicateResume(resumeId,data.title);
            toast.success("Curriculo duplicado com sucesso!");
            router.push(`/dashboard/resumes/${newResume.id}`)
        } catch (error) {
            console.error(error)
            toast.error("Erro ao deletar o duplicar, tente novamente mais tarde.")
        }
    }
    return (
        <Dialog
            {...props}
            open={open}
            setOpen={setOpen}
            title="Duplicar Curricculo"
            description="Voce tem certeza que deseja duplicar este curriculo?"
            content={
                <form className="flex flex-col" onSubmit={methos.handleSubmit(onSubmit)}>
                    <Controller control={methos.control} name="title" rules={{required: "Campo obrigatorio"}}  render={({ field }) => (
                        <Input placeholder="Novo Titulo" {...field} />
                    )} />
                    <div className="flex mt-4 ml-auto gap-4">
                        <Button variant="secondary" >Cancelar</Button>
                        <Button type="submit">Duplicar</Button>
                    </div>
                </form>
            }
        />
    )
}