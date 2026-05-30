import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("Payment succeeded:", event.data.object.id);
      break;

    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object.id);
      break;

    case "charge.refunded":
      console.log("Payment refunded:", event.data.object.id);
      break;

    default:
      console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
