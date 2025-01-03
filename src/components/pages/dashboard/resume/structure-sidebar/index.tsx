import { Separator } from "@/components/ui/separator"
import { TemplatesListSction } from "./sections/templates-list"

import { LayoutSection } from "./sections/layouts"

export const StructureSidebar = () => {
    return (
        <aside className="w-full h-full p-6 overflow-y-auto">
            <TemplatesListSction />
            <Separator className="my-5" />
            <LayoutSection />
        </aside>
    )
}