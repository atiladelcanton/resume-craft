import { TemplatesListSction } from "./sections/templates-list"

export const StructureSidebar = () => {
    return (
        <aside className="w-full h-full p-6 overflow-y-auto">
            <TemplatesListSction />
        </aside>
    )
}