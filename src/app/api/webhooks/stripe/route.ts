import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { custom } from "zod";
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
export const POST = async (req: Request) => {
    try {
        const sig = req.headers.get('Stripe-Signature');
        if (!sig) return Response.json({ error: 'No signature' }, { status: 400 });

        let event;
        const rawBody = await req.text();

        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        } catch (error) {
            return Response.json({ error: `Webhook Error: ${error}` }, { status: 400 });
        }

        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object as Stripe.Checkout.Session;
                const customerEmail = session?.customer_details?.email;

                if (!customerEmail) return Response.json({ error: 'No customer email' }, { status: 400 });

                const lineItens = await stripe.checkout.sessions.listLineItems(session.id, { expand: ['data.price.product'] });
                console.log('lineItens', lineItens);

                const product = lineItens.data[0];
                console.log('product', product);
                const creditsAmount = Number(product.price?.metadata?.amount);
                console.log('creditsAmount', creditsAmount);
                if (!creditsAmount) return Response.json({ error: 'Invalid credits amount' }, { status: 400 });
                const user = await db.query.users.findFirst({ where: eq(users.email, customerEmail) });
                console.log('user', user);
                if (!user) return Response.json({ error: 'User not found' }, { status: 404 });
                await db.update(users)
                    .set({ credits: user.credits + creditsAmount })
                    .where(eq(users.email, customerEmail));
                break;
        }
        return Response.json({ received: true });
    } catch (error) {
        console.error(error);
        return Response.json({ error }, { status: 500 });
    }
}