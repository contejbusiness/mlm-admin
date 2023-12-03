"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type PlanColumn = {
  id: string;
  name: string;
  price: string;
  reward: String;
  totalPurchased: number;
  createdAt: string;
};

export const columns: ColumnDef<PlanColumn>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "reward",
    header: "Reward",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
