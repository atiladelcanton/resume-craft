
import { UserRound } from "lucide-react";
import { SectionTitle } from "../section-title";
import { InputFIeld } from "@/components/ui/input/field";
import { SwitchField } from "@/components/ui/switch/field";


export const BasicInfoSection = () => {
    return (
        <div>
            <SectionTitle
                title="Informações Básicas"
                icon={UserRound}
            />
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                <div className="col-span-full w-full flex gap-3 items-end">
                    <InputFIeld
                        label="Foto"
                        placeholder="http://..."
                        name="content.image.url"
                        containerClassName="flex-1"
                    />
                    <SwitchField name="content.image.visible" className="mb-2" />

                </div>
                <InputFIeld label="Nome Completo" name="content.infos.fullName" />
                <InputFIeld label="Cabeçalho" name="content.infos.headLine" />
                <InputFIeld label="E-mail" name="content.infos.email" />
                <InputFIeld label="Site" name="content.infos.website" />
                <InputFIeld label="Telefone" name="content.infos.phone" />
                <InputFIeld label="Localização" name="content.infos.location" />
            </div>
        </div>
    );
}