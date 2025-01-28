import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { languagesOptions } from "../../../structure-sidebar/sections/language";
import { mergician } from "mergician";
import { queryKeys } from "@/constants/query-keys";
type FormData = {
    language: ResumeLanguages
}

type GenerateTranslationProps = {
    onClose: () => void;
}
export const GenerateTranslation = ({ onClose }: GenerateTranslationProps) => {
    const { control, formState, handleSubmit,getValues: getFormValues } = useForm<FormData>();
    const { setValue, getValues } = useFormContext<ResumeData>();
    const { mutate: handleGenerate,isPending } = useMutation({
        mutationFn: ApiService.translate,
        onSuccess:(data) => {
            const content = getValues("content");
            const generation = JSON.parse(data.data)
            const mergedContent = mergician(content, generation) as ResumeContentData;
            const language = getFormValues("language");
            setValue("content", mergedContent)
            setValue("structure.languages", language)
            console.log(generation)
            toast.success("Conteudo gerado com sucesso!");
            queryClient.invalidateQueries({ queryKey: queryKeys.credits });
            onClose();
        }
    })
    const queryClient = useQueryClient();
    const onSubmit = async (formData: FormData) => {
        const content = getValues("content");
        const selectedLanguage = languagesOptions.find((item) => item.value = formData.language)
        handleGenerate({
            content,
            language: selectedLanguage?.label!
        });
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <p>Esta funcionalidade traduz o conteudo atual para a linguagem selecionada abaixo</p>
            <p>Isso pode levar alguns segundos, aguarde o resultado</p>
            <Controller
                control={control}
                name="language"
                rules={{ required: true }}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um Idioma" />
                        </SelectTrigger>
                        <SelectContent>
                            {languagesOptions.map((language, index) => (
                                <SelectItem value={language.value} key={`${language.value}_translate_${index}`}>{language.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

            />
            <Button className="w-max ml-auto" type="submit" disabled={isPending}> Gerar Conteudo</Button>
        </form>
    )
}