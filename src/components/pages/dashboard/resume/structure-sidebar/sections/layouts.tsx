import { Columns2 } from "lucide-react"
import { SectionTitle } from "../../infos-sidebar/section-title"
import { useFieldArray, useFormContext } from "react-hook-form";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { LayoutDragList } from "../layout-drag-list";

export const LayoutSection = () => {
    const { control } = useFormContext<ResumeData>();
    const { fields: mainFields, move: moveMainField, insert: InsertMainField, remove: RemoveMainField } = useFieldArray({
        control,
        name: "structure.layout.mainSections"
    });
    const { fields: sidebarFields, move: moveSidebarField, insert: InsertSidebarField, remove: RemoveSidebarField } = useFieldArray({
        control,
        name: "structure.layout.sidebarSections"
    });
    const onDragEnd = ({ source, destination }: DropResult) => {
        if(!destination) return;
       if(source.droppableId !== destination.droppableId){
          switch(destination.droppableId){
            case "mainFields":
               InsertMainField(destination.index, sidebarFields[source.index]);
               RemoveSidebarField(source.index);
               break;
            case "sidebarFields":
                InsertSidebarField(destination.index, mainFields[source.index]);
                RemoveMainField(source.index);
                break;
          }
        }
        if(source.droppableId === "mainFields"){
            moveMainField(source.index, destination.index);
        }else{
            moveSidebarField(source.index, destination.index);
        }
    };
    return (
        <div>
            <SectionTitle title="Estrutura" icon={Columns2} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Droppable droppableId="mainFields">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <LayoutDragList title="Principal" fields={mainFields} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="sidebarFields">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <LayoutDragList title="Barra Lateral" fields={sidebarFields} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}