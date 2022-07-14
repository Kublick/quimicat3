import { PencilIcon } from "@heroicons/react/solid";
import { Card, Col, Row, Tooltip } from "@nextui-org/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useState } from "react";
import {
  SBody,
  SHeader,
  SHeaderLabel,
  STable,
  STH,
} from "../../../styles/TableStyles";
import { IconButton } from "../../ui/utils/IconButton";

type Props<T> = {
  rows: T[];
  columns: ColumnDef<T>[];
};

const MasterTable = <T,>({ rows, columns }: Props<T>) => {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      css={{
        width: "auto",
        padding: "0.5rem",
        mx: "2rem",
      }}
    >
      <STable>
        <SHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <SHeaderLabel key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <STH key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </SBody>
      </STable>
    </Card>
  );
};

export default MasterTable;
