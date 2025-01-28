import { Button } from "@/components/ui/button"
import { BadgeCent, Bot, BriefcaseBusiness, CirclePercent, Languages, PencilLine } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { GenerationDialog } from "./generation-dialog"
import { useQuery } from "@tanstack/react-query"
import { ApiService } from "@/services/api"
import { Skeleton } from "@/components/ui/skeleton"
import { BuyCreditsDialog } from "./buy-credits-dialog"
import { queryKeys } from "@/constants/query-keys"
import { toast } from "sonner"


export const AiGenerationDropdown = () => {
    const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(null)
    const [showCreditsDialog,setShowCreditsDialog] = useState(false)
    const onAction = (mode: AIGenerationMode) => {
        // if(!credits){
        //     toast.error("Você não possui creditos suficientes para usar essa funcionalidade",{
        //         action:{
        //             label:"Comprar creditos",
        //             onClick:() => setShowCreditsDialog(true)
        //         }
        //     });
        //     return;
        // }
        setGenerationMode(mode);
    }
    const actions = [
        {
            label: "Comprar créditos",
            icon: CirclePercent,
            onclick: () => setShowCreditsDialog(true),
        },
        {
            label: "Gerar conteúdo para vaga de emprego",
            icon: BriefcaseBusiness,
            onclick: () => onAction('JOB_TITLE'),
        },
        {
            label: "Melhorar e corrigir conteúdo existente",
            icon: PencilLine,
            onclick: () => onAction('FIX_CONTENT'),
        },
        {
            label: "Traduzir conteúdo existente",
            icon: Languages,
            onclick: () => onAction('TRANSLATE_CONTENT'),
        },
    ]

    const {data: credits,isLoading} = useQuery({
        queryKey:queryKeys.credits,
        queryFn: ApiService.getCredits
    });
    
    return (

        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="gap-2 text-xs px-2.5 py-1 h-9">
                        <Bot size={20} />
                        Inteligência Artificial
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} align="end">
                    <DropdownMenuLabel className="text-muted-foreground text-xs flex items-center gap-2">
                        Você possui {" "}
                        <strong className="text-foreground inline-flex gap-0.5 items-center">
                            <BadgeCent size={14} />
                            {isLoading ? <Skeleton  className="w-5 h-5" /> : credits} {" "}
                             {credits === 1 ? "credito":"creditos"}
                        </strong>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actions.map(action => (
                        <DropdownMenuItem key={action.label} className="gap-2" onClick={action.onclick} disabled={isLoading}>
                            <action.icon size={18} className="text-muted-foreground" />
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <BuyCreditsDialog open={showCreditsDialog} setOpen={setShowCreditsDialog}/>
            {!!generationMode && (
                <GenerationDialog mode={generationMode} open={!!generationMode} setOpen={(value) => {
                    if (!value) setGenerationMode(null);

                }} />
            )}
        </>
    )
}