"use client"

import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { deleteResume } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteResumeDialog = (props: BaseDialogProps) => {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const resumeId = params.id as string;

    const {mutate: handleDeleteResume,isPending} = useMutation({
        mutationFn:deleteResume,
        onSuccess:() => {
            toast.success("Curriculo deletado com sucesso!");
            router.push("/dashboard/resumes")
        }
    })

    const onDelete = async () => {
        handleDeleteResume(resumeId);
    }
    return (
        <Dialog
            {...props}
            open={open}
            setOpen={setOpen}
            title="Deletar Curricculo"
            description="Voce tem certeza que deseja deletar este curriculo?"
            content={
                <div className="flex gap-2 ml-auto">
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button variant="destructive" onClick={onDelete} disabled={isPending} >Deletar</Button>
                </div>
            }
        />
    )
}