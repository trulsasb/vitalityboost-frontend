interface RecentOrder {
  id: string;
  customer: string;
  total: number;
}

const mockOrders: RecentOrder[] = [
  { id: "1001", customer: "Ola Nordmann", total: 499 },
  { id: "1002", customer: "Kari Nordmann", total: 899 },
  { id: "1003", customer: "Per Hansen", total: 1299 },
];

export function RecentOrders() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Siste ordrer</h2>

      <div className="space-y-2">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <div>
              <p className="font-medium">{order.customer}</p>
              <p className="text-sm text-muted-foreground">#{order.id}</p>
            </div>
            <p className="font-semibold">{order.total} kr</p>
          </div>
        ))}
      </div>
    </div>
  );
}
