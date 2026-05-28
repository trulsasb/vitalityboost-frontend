"use client";

interface OrderActionsProps {
  onUpdateStatus: () => void;
  onRefund: () => void;
  onCancel: () => void;
}

export default function OrderActions({
  onUpdateStatus,
  onRefund,
  onCancel,
}: OrderActionsProps) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={onUpdateStatus}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Oppdater status
      </button>

      <button
        onClick={onRefund}
        className="px-3 py-1 bg-yellow-600 text-white rounded"
      >
        Refundér
      </button>

      <button
        onClick={onCancel}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Kanseller ordre
      </button>
    </div>
  );
}
