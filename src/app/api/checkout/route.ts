import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const AMOUNT_CENTS = 1490;
const CURRENCY = "eur";
const PRODUCT_NAME = "Entre Nous";

export async function POST(request: Request) {
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: CURRENCY,
          product_data: { name: PRODUCT_NAME },
          unit_amount: AMOUNT_CENTS,
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/paiement/succes`,
    cancel_url: `${origin}/paiement/annule`,
  });

  return NextResponse.json({ url: session.url });
}
