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
import { User } from "next-auth";
import { useCallback, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { updateResume } from "@/db/actions";
import { useParams } from "next/navigation";
import { mergician } from 'mergician';
type ResumePageProps = {
    title: string;
    initialData: Partial<ResumeData>;
    user?: User;
}

export const ResumePage = ({ title, initialData, user }: ResumePageProps) => {

    const params = useParams();
    const resumeId = params.id as string;

    const defaultValues: ResumeData = {
        content: {
            image: {
                url: user?.image ?? "",
                visible: true
            },
            infos: {
                fullName: user?.name ?? "",
                headLine: "",
                email: user?.email ?? "",
                phone: "",
                location: "",
                website: "",
            },
            summary: "<p></p>",
            socialMedias: [],
            experiences: [],
            educations: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: []
        },
        structure: {
            template: "ditto",
            colorTheme: "slate",
            languages: "portuguese",
            layout: {
                mainSections: [
                    { key: "socialMedias" },
                    { key: "summary" },
                    { key: "experiences" },
                    { key: "educations" },
                    { key: "certifications" },
                    { key: "projects" }
                ],
                sidebarSections: [
                    { key: "skills" },
                    { key: "languages" },
                ]
            }
        }
    }

    const methods = useForm<ResumeData>({
        defaultValues: mergician(defaultValues, initialData)
    });
    const data = methods.watch();
    const shouldSave = useRef(false);
    const debouncedData = useDebounce(JSON.stringify(data), 1000);
    const handleSaveUpdates = useCallback(() => {
        try {
            if (!shouldSave.current) {
                shouldSave.current = true;
                return;
            }
            const updatedData = methods.getValues();
            updateResume(resumeId, updatedData)
        } catch (error) {
            console.error(error)
        }
    }, [methods, resumeId])
    useEffect(() => { handleSaveUpdates() }, [debouncedData, handleSaveUpdates]);
    return (
        <FormProvider {...methods}>
            <main className="w-full h-screen overflow-hidden">
                <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                    <ResizablePanel minSize={20} maxSize={40} defaultSize={30}>
                        <InfosSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                        <ResumeContent title={title}/>
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