"use client";

interface OrderItemRowProps {
  item: {
    id: string;
    product_name: string;
    quantity: number;
    total_price: number;
  };
}

export default function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    <div className="flex justify-between border-b pb-2">
      <div>
        <p className="font-medium">{item.product_name}</p>
        <p className="text-sm text-gray-600">Antall: {item.quantity}</p>
      </div>
      <p>{item.total_price} kr</p>
    </div>
  );
}
