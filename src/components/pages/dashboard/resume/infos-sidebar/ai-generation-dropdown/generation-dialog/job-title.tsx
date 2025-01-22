import { Button } from "@/components/ui/button";
import { EditorField } from "@/components/ui/editor/field";
import { InputFIeld } from "@/components/ui/input/field";
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
    jobTitle: string;
    JobDescription: string
}
type GenerationData = {
    headline: string;
    summary: string;
    skills: {
        name: string;
        keywords: string
    }[];
}
type GenerateFromJobTitleProps = {
    onClose: () => void;
}
export const GenerateFromJobTitle = ({ onClose }: GenerateFromJobTitleProps) => {
    const { control, formState, handleSubmit } = useForm<FormData>();
    const { setValue } = useFormContext<ResumeData>();
    const { mutateAsync: handleGenerate } = useMutation({
        mutationFn: ApiService.generateContentForJob,
    })
    const onSubmit = async (formData: FormData) => {
        const data = await handleGenerate(formData);
        const generation = JSON.parse(data.data) as GenerationData;
        setValue('content.infos.headLine', generation.headline);
        setValue('content.summary', generation.summary);
        setValue('content.skills', generation.skills);

        toast.success("Conteudo gerado com sucesso!");
        onClose();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <InputFIeld name="jobTitle" label="TItulo da Vaga" placeholder="Desenvolvedor Front-end" required control={control} />
            <EditorField name="JobDescription" label="Descricao da vaga (Opcional)" containerClassName="min-h-[200px] max-h-[300px]" control={control} />
            <Button className="w-max ml-auto" type="submit" disabled={formState.isSubmitting}> Gerar Conteudo</Button>
        </form>
    )
}