// Table.tsx
"use client";

import React from "react";
import clsx from "clsx";

type Column<T> = {
  key: keyof T;
  header: string;
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
};

export function Table<T>({ columns, data, className }: TableProps<T>) {
  return (
    <table className={clsx("w-full border-collapse text-sm", className)}>
      <thead>
        <tr className="border-b border-gray-300">
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className={clsx("text-left py-2 font-medium text-gray-700", col.className)}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-200">
            {columns.map((col) => (
              <td
                key={String(col.key)}
                className={clsx("py-2 text-gray-800", col.className)}
              >
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
