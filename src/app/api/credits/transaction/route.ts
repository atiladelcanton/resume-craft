import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

export const POST = async (request: Request) => {
    const { currentPathname } = await request.json();
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return Response.json({ error: "Permissão Negada" }, { status: 401 });

    const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
    });

    if (!user) return Response.json({ error: "Usuário não encontrado" }, { status: 404 });

    if (!user.customerId) {
        return Response.json({ error: "Usuário não fez nenhuma compra" }, { status: 400 });
    }

    const portal = await stripe.billingPortal.sessions.create({
        customer: user.customerId,
        return_url: `${process.env.APP_URL}/${currentPathname}` ,
    })

    return Response.json({ url: portal.url });
}
