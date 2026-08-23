import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface CheckoutCustomer {
  name: string;
  email: string;
  address: string;
  zip: string;
  city: string;
}

// Creates the order and initiates payment through the backend, which is the
// only place that holds the Stripe/Vipps secret keys and looks up real
// product prices server-side (the old version trusted item.price from the
// browser). This route is just a thin proxy so the checkout page keeps a
// stable same-origin endpoint to call.
export async function POST(req: Request) {
  try {
    const { items, provider, customer, discountCode } = (await req.json()) as {
      items: CheckoutItem[];
      provider: "stripe" | "vipps";
      customer: CheckoutCustomer;
      discountCode?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Handlekurven er tom" }, { status: 400 });
    }
    if (provider !== "stripe" && provider !== "vipps") {
      return NextResponse.json({ error: "Ugyldig betalingsmetode" }, { status: 400 });
    }
    if (!customer?.name || !customer?.email || !customer?.address || !customer?.zip || !customer?.city) {
      return NextResponse.json({ error: "Mangler kunde- eller leveringsinformasjon" }, { status: 400 });
    }

    const orderRes = await fetch(`${API_BASE}/orders/direct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          product_id: Number(item.productId),
          quantity: item.quantity,
        })),
        customer_name: customer.name,
        customer_email: customer.email,
        shipping_address: customer.address,
        shipping_zip: customer.zip,
        shipping_city: customer.city,
        discount_code: discountCode || null,
      }),
    });

    if (!orderRes.ok) {
      const detail = await orderRes.json().catch(() => null);
      return NextResponse.json(
        { error: detail?.detail || "Kunne ikke opprette ordre" },
        { status: orderRes.status }
      );
    }

    const order = await orderRes.json();

    const paymentRes = await fetch(
      `${API_BASE}/payments/${provider}/initiate/${order.order_id}`,
      { method: "POST" }
    );

    if (!paymentRes.ok) {
      const detail = await paymentRes.json().catch(() => null);
      return NextResponse.json(
        { error: detail?.detail || "Kunne ikke starte betaling" },
        { status: paymentRes.status }
      );
    }

    const payment = await paymentRes.json();
    return NextResponse.json({
      url: payment.checkout_url,
      paymentId: payment.payment_id,
      statusToken: payment.status_token,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Noe gikk feil under checkout" }, { status: 500 });
  }
}
