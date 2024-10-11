"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table, type TableState } from "@tanstack/react-table";
import React from "react";

import { Button, Input } from "../ui";

import { cn } from "~/lib/utils";
import {
  DataTableFacetedFilter,
  type DataTableFacetedFilterProps,
} from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export type Action<TData> =
  | {
      name: string;
      action: (state: Table<TData>) => void;
      icon?: React.ReactNode;
      className?: ((state: TableState) => string) | string;
      customComponent?: never;
    }
  | {
      customComponent: (props: {
        action: (state?: Table<TData>) => void;
      }) => React.ReactNode;
      action?: (state: Table<TData>) => void;
    };

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: {
    title: string;
    column: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: DataTableFacetedFilterProps<TData, any>["options"];
  }[];
  searchFilter?: string;
  actions?: Action<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filters,
  searchFilter = "title",
  actions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={
            (table.getColumn(searchFilter)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchFilter)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters?.map((filter, index) => (
          <DataTableFacetedFilter
            key={index}
            column={table.getColumn(filter.column)}
            title={filter.title}
            options={filter.options}
          />
        ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {actions?.map((action, index) => {
        if (action.customComponent) {
          const component = action.customComponent({
            action: () => (action.action ? action.action(table) : undefined),
          });
          if (React.isValidElement(component)) {
            return React.cloneElement(component, { key: index });
          }

          return null;
        }
        const className =
          typeof action.className === "function"
            ? action.className(table.getState())
            : action.className;
        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={cn("ml-auto hidden h-8 lg:flex", className)}
            onClick={() => action.action(table)}
          >
            {action.icon}
            {action.name}
          </Button>
        );
      })}

      <DataTableViewOptions table={table} />
    </div>
  );
}
