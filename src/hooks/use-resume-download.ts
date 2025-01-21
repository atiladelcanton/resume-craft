import { api } from "@/lib/axios"
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export const useResumeDownload = (title?: string) => {
    const { getValues } = useFormContext<ResumeData>()

    const { mutateAsync: handleGetResume, isPending } = useMutation({
        mutationFn: ApiService.getResumeUrl
    })

    const handleDownloadResume = async () => {
        const resume = document.getElementById("resume-content");
        const structure = getValues("structure")
        if (!resume) return;
        const url = await handleGetResume({
            html: resume.outerHTML,
            structure
        })

        const link = document.createElement("a")
        link.href = url;
        link.setAttribute("download", `${title ?? "Curriculo"}.pdf`)
        document.body.appendChild(link)
        link.click();
        link.remove();
    }

    return { handleDownloadResume,isLoading: isPending }
}