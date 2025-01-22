import { BaseDialogProps, Dialog } from "@/components/ui/dialog"
import { GenerateFromJobTitle } from "./job-title";
import { GenerateFixContent } from "./fix-content";
import { GenerateTranslation } from "./translate";
type GenerationDialogProps = BaseDialogProps & {
    mode: AIGenerationMode;
    setOpen: (open: boolean) => void;
}
export const GenerationDialog = ({ mode, ...props }: GenerationDialogProps) => {
    const onClose = () => {
        props.setOpen(false);
    }
    const configPerMode: Record<AIGenerationMode, JSX.Element> = {
        JOB_TITLE: <GenerateFromJobTitle onClose={onClose} />,
        FIX_CONTENT: <GenerateFixContent onClose={onClose} />,
        TRANSLATE_CONTENT: <GenerateTranslation onClose={onClose} />,
    };
    const content = configPerMode[mode]
    return (
        <Dialog
            title="Inteligência Artificial"
            description="O conteúdo gerado sobrescreveré os campos existentes. Cada geracao custa 1 crédito"
            {...props}
            content={content}
        />
    )
}