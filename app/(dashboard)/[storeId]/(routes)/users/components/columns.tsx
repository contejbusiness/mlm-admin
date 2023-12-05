"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type UserColumn = {
  id: string;
  name: string;
  email: string;
  balance: number;
  createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "createdAt",
    header: "Joined",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
