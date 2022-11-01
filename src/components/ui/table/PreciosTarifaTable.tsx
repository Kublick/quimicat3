/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from "react";

import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type RowData,
} from "@tanstack/react-table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  STable,
  SHeader,
  SHeaderLabel,
  STH,
  STD,
} from "../../../styles/TableStyles";
import { Button, Input } from "@nextui-org/react";

type Props = {
  rows: TableTypes[];
  handleManualSubmit: (rows: TableTypes[]) => void;
};

type TableTypes = {
  id: string;
  precio: number;
  name: string;
  description: string;
};

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<TableTypes>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();

    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <Input
        aria-label="precio"
        value={value as string}
        placeholder={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

export function PrecioTable({ rows, handleManualSubmit }: Props) {
  const columns = useMemo<ColumnDef<TableTypes>[]>(
    () => [
      {
        accessorKey: "description",
        header: () => "Descripcion",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Nombre",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "precio",
        header: () => "precio",
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = useState(rows);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <div className="p-2">
      <div className="h-2" />
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <STD key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </STD>
              ))}
            </tr>
          ))}
        </tbody>
      </STable>
      <Button color="secondary" onClick={() => handleManualSubmit(data)}>
        Actualizar
      </Button>
    </div>
  );
}
