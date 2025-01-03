import { Languages } from "lucide-react"
import { SectionTitle } from "../../infos-sidebar/section-title"
import { Controller, useFormContext } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type LanguageOption = {
    label: string;
    value: ResumeLanguages;
  };
  
  export const languagesOptions: LanguageOption[] = [
    {
      label: "Inglês",
      value: "english",
    },
    {
      label: "Espanhol",
      value: "spanish",
    },
    {
      label: "Francês",
      value: "french",
    },
    {
      label: "Alemão",
      value: "german",
    },
    {
      label: "Italiano",
      value: "italian",
    },
    {
      label: "Português",
      value: "portuguese",
    },
  ];

export const LanguageSection = () => {
    const { control } = useFormContext<ResumeData>();
    return (
        <div>
            <SectionTitle title="Language" icon={Languages} />
            <Controller
                control={control}
                name="structure.languages"
                render={({ field }) => (
                    
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="mt-4">
                                <SelectValue placeholder="Selecione uma linguagem" />
                            </SelectTrigger>
                            <SelectContent>
                                {languagesOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                                
                            </SelectContent>
                        </Select>

                   
                )}
            />
        </div>
    )
}