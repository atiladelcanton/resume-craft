import { decrementUserCredits } from "@/db/actions";
import { getUserCredits } from "@/db/queries";
import { openai } from "@/lib/openai";
import { isValidJson } from "@/lib/utils";
import { z } from "zod";

const schema = z.object({
    content: z.object({}).passthrough(),
    language: z.string(),
})

export const POST = async (request: Request) => {
    try {
        const credits = await getUserCredits();
        if (credits <= 0) {
            return Response.json({ message: "Você não possui creditos suficientes para usar essa funcionalidade" }, { status: 400 })
        }
        const body = await request.json();
        const { content, language } = schema.parse(body);


        const completions = await openai.chat.completions.create({
            model: process.env.OPENAI_API_MODEL as string,
            messages: [
                {
                    role: "user",
                    content: `
                  Baseado no JSON abaixo, traduza todos os valores dos campos para a linguagem ${language}, não importa qual linguagem o valor está escrito originalmente. Também aprimore o texto para parecer mais claro e profissional, pois será usado em currículos.
                  Também corrija erros gramaticais e de concordância, se necessário.
                  Mantenha dados específicos pessoais, links, emails, telefones, etc. como estão, apenas altere o texto dos campos.
              
                  **Lembre-se de retornar um JSON válido e bem formatado.**
              
                  **Não traduza o nome dos campos (as keys do objeto) original, mantenha isso de forma original e traduza o conteúdo dos campos.**
              
                  **JSON:**
              
                  ${JSON.stringify(content, null, 2)}
                `,
                },
            ],
        })
        const json = completions.choices[0].message.content ?? "";
        if (!isValidJson(json)) throw new Error("JSON invalido");
        await decrementUserCredits(1)
        return Response.json({ data: json });

    } catch (error) {
        console.log(error)
        return Response.json({ message: "Ocorreu um erro inesperado", error }, { status: 500 })
    }
}