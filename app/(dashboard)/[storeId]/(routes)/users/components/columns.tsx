"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type UserColumn = {
  id: string;
  name: string;
  phone: string;
  balance: number;
  redeems: number;
  requests: number;
  plan: string;
  referrals: number;
  createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
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
    accessorKey: "redeems",
    header: "Redeems",
  },
  {
    accessorKey: "requests",
    header: "Requests",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "referrals",
    header: "Referrals",
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
