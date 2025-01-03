import { Palette } from "lucide-react"
import { SectionTitle } from "../../infos-sidebar/section-title"
import colors from "tailwindcss/colors";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const keysToIgnore = ["black", "white", "transparent", "current", "inherit", "currentColor"];
const colorKeys = Object.keys(colors).filter((key) => !keysToIgnore.includes(key)) as (keyof typeof colors)[];

export const ThemeSection = () => {
    const { control } = useFormContext<ResumeData>();
    return (
        <div>
            <SectionTitle title="Tema" icon={Palette} />
            <Controller
                control={control}
                name="structure.colorTheme"
                render={({ field }) => (
                    <div className="grid grid-cols-7 gap-4 mt-4">
                        {colorKeys.map(colorKey => {
                            const isSelected = field.value === colorKey;
                            return (
                                <Button
                                    key={colorKey}
                                    variant='ghost'
                                    className={cn(
                                        "w-7 h-7 p-1 rounded-full transition-all",
                                        isSelected && "ring-2 ring-foreground"
                                    )}
                                    onClick={() => field.onChange(colorKey)}
                                >
                                    <div
                                        className="w-full h-full rounded-full"
                                        style={{ backgroundColor: colors[colorKey][500] }}
                                    ></div>
                                </Button>
                            )
                        })}
                    </div>
                )}

            />
        </div>
    )
}