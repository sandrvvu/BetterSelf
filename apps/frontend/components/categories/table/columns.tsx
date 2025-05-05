"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "@/components/categories";
import { CategoryWithGoalCount } from "@/lib";

export const columns: ColumnDef<CategoryWithGoalCount>[] = [
  {
    accessorFn: (row) => row.name,
    id: "name",
    header: "Category Name",
    cell: ({ row }) => {
      return (
        <div className="text-pink-400 font-semibold">{row.original.name}</div>
      );
    },
  },
  {
    id: "totalGoals",
    header: () => <div className="text-center">Total Goals</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.allGoals}</div>;
    },
  },
  {
    id: "completedGoals",
    header: () => <div className="text-center">Completed</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.completedGoals}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
