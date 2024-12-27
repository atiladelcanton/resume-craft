"use client";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { InfosSidebar } from "./infos-sidebar"
import { ResumeContent } from "./resume-content"
import { StructureSidebar } from "./structure-sidebar"
import { FormProvider, useForm } from "react-hook-form"
export const ResumePage = () => {
    const defaultValues: ResumeData = {
        content:{
            image: {
                url: "",
                visible: true
            },
            infos: {
                fullName: "",
                headLine: "",
                email: "",
                phone: "",
                location: "",
                website: "",
            },
            summary: "",
            socialMedias: [
                {
                    icon: "",
                    name:"Teste 1",
                    url: "https://site.com.br",
                    username: "Teste Atilao"
                },
                {
                    icon: "",
                    name:"Teste 2",
                    url: "https://site2.com.br",
                    username: "Teste Atilao 2"
                },
            ],
            experiences: [],
            educations: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: []
        }
    }
    const methods = useForm<ResumeData>({defaultValues});
    return (
        <FormProvider {...methods}>
            <main className="w-full h-screen overflow-hidden">
                <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                    <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
                        <InfosSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                        <ResumeContent />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20} maxSize={35} defaultSize={25}>
                        <StructureSidebar />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </FormProvider>
    )
}