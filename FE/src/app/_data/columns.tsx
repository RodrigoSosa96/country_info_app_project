"use client";
import { type ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import {
  Badge,
  Button,

} from "~/components/ui/";
import { type CountryType } from "~/schemas/country";

export const columns: ColumnDef<CountryType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-md">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "countryCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="countryCode" />
    ),
    cell: ({ row }) => (
      <Badge variant={"outline"}  className="">{row.getValue("countryCode")}</Badge>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const country = row.original;
      return (
        <Link href={`/countries/${country.countryCode}`}>
          <Button variant="outline">Check Details</Button>
        </Link>
      );
    },
  },
];
