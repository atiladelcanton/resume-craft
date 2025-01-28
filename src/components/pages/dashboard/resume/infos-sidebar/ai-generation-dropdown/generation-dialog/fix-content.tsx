import { Button } from "@/components/ui/button";
import { EditorField } from "@/components/ui/editor/field";
import { InputFIeld } from "@/components/ui/input/field";
import { ApiService } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { mergician } from "mergician";
import { queryKeys } from "@/constants/query-keys";

type GenerateFixContentProps = {
    onClose: () => void;
}
export const GenerateFixContent = ({ onClose }: GenerateFixContentProps) => {
    const { formState, handleSubmit } = useForm();
    const { getValues, setValue } = useFormContext<ResumeData>();
    const { mutate: handleGenerate,isPending } = useMutation({
        mutationFn: ApiService.fixContent,
        onSuccess: (data) => {
            const content = getValues("content")
            const generation = JSON.parse(data.data)

            const mergedContent = mergician(content, generation) as ResumeContentData;
            setValue("content", mergedContent)
            toast.success("Conteudo gerado com sucesso!");
            queryClient.invalidateQueries({ queryKey: queryKeys.credits });
            onClose();
        }
    })
    const queryClient = useQueryClient();
    const onSubmit = async () => {
        const content = getValues("content")
        handleGenerate(content);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <p>Esta funcionalidade aprimora o conteúdo atual do currículo e também corrige possíveis erros gramaticais.{" "}
                <strong>Lembre-se de preencher o conteúdo antes da correção.</strong>
            </p>
            <p>Isso pode levar alguns segundos, aguarde o resultado.</p>
            <Button className="w-max ml-auto" type="submit" disabled={isPending}> Gerar Conteudo</Button>
        </form>
    )
}