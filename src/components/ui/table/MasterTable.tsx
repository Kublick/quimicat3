import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";

import { Button, Card } from "@nextui-org/react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import {
  SBody,
  SHeader,
  SHeaderLabel,
  STable,
  STD,
  STH,
} from "../../../styles/TableStyles";
import { type RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { TableDebounceInput } from "./TableDebounceInput";
import { SSelect } from "../../../styles/SelectStyles";

declare module "@tanstack/table-core" {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

type Props<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const MasterTable = <T,>({ rows, columns }: Props<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table]);

  return (
    <Card
      css={{
        width: "auto",
        padding: "0.5rem",
        mx: "2rem",
      }}
    >
      <TableDebounceInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
      />

      <STable>
        <SHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <SHeaderLabel key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <STH key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex gap-4 items-center justify-center"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon className="h-5 w-5" />,
                          desc: <ChevronDownIcon className="h-5 w-5" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
                  )}
                </STH>
              ))}
            </SHeaderLabel>
          ))}
        </SHeader>
        <SBody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <STD key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </STD>
              ))}
            </tr>
          ))}
        </SBody>
      </STable>
      <div className="h-2" />
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          auto
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>

        <strong>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </strong>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          auto
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>

        <div>
          <SSelect
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </SSelect>
        </div>
      </div>
      <div className="ml-4">{table.getRowModel().rows.length} Registros</div>
    </Card>
  );
};

export default MasterTable;
