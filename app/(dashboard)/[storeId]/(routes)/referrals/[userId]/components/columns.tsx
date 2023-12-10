"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ReferralColumn = {
  id: string;
  name: string;
  phone: string;
  balance: string;
  plan: string;
  createdAt: string;
};

export const columns: ColumnDef<ReferralColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
