import { PageShell } from "@/components/layout/PageShell";
import { PageSection } from "@/components/layout/PageSection";
import { PageContainer } from "@/components/layout/PageContainer";

import { CartSummary } from "@/app/cart/CartSummary";
import { CartItem } from "@/app/cart/Drawer/CartItem";

import { getCart } from "@/lib/cart"; // Du får denne filen etterpå

export default async function CartPage() {
  // Hent cart fra API (server-side)
  const cart = await getCart();

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <PageShell>
      <PageSection>
        <PageContainer>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Handlekurv
          </h1>

          {isEmpty ? (
            <p className="text-lg text-gray-700">
              Handlekurven din er tom.
            </p>
          ) : (
            <div className="grid gap-12 lg:grid-cols-3">

              {/* Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Summary */}
              <div>
                <CartSummary
                  subtotal={cart.subtotal}
                  shipping={cart.shipping}
                  total={cart.total}
                  checkoutUrl="/checkout"
                />
              </div>

            </div>
          )}

        </PageContainer>
      </PageSection>
    </PageShell>
  );
}
