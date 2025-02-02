'use client';

import { useQuery } from '@tanstack/react-query';
import { cn, getDateFormat } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ListFilter,
} from 'lucide-react';
import { useId, useMemo, useRef, useState } from 'react';

import { Input } from './ui/input';
import { DrawerDetailOrder } from './drawer-detail-order';

export type Order = {
  customerId: string;
  employeeId: number;
  freight: number;
  id: number;
  orderDate: string;
  requiredDate: string;
  shipAddress: string;
  shipCity: string;
  shipCountry: string;
  shipName: string;
  shipPostalCode: string;
  shipVia: number;
  shippedDate: string;
  shipRegion: string;
};

type Response = {
  rows: Array<Order>;
  pageCount: number;
  rowCount: number;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Order> = (row, _columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.id} ${row.original.customerId} ${row.original.employeeId} ${row.original.freight} ${row.original.orderDate} ${row.original.requiredDate} ${row.original.shipAddress} ${row.original.shipCity} ${row.original.shipCountry} ${row.original.shipName} ${row.original.shipPostalCode} ${row.original.shipVia} ${row.original.shippedDate}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export default function OrderTable() {
  const id = useId();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Order>();

  const { isFetching, data } = useQuery<Response>({
    queryKey: ['customers', pagination],
    queryFn: async () => {
      const take = pagination.pageSize;
      const skip = pagination.pageSize * pagination.pageIndex;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/QueryOrders?take=${take}&include=total&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return {
        rows: data.results.map((result: Order) => {
          return {
            ...result,
            orderDate: result.orderDate ? getDateFormat(result.orderDate) : '',
            requiredDate: result.requiredDate
              ? getDateFormat(result.requiredDate)
              : '',
            shippedDate: result.shippedDate
              ? getDateFormat(result?.shippedDate)
              : '',
          };
        }),
        pageCount: Math.ceil(data.results.length / pagination.pageSize),
        rowCount: data.total,
      };
    },
  });

  const columns: Array<ColumnDef<Order>> = useMemo(() => {
    return [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: ({ row }) => (
          <Button
            variant="outline"
            className="font-medium"
            onClick={() => {
              setOpen(!open);
              setSelectedRow(row.original);
            }}
          >
            {row.getValue('id')}
          </Button>
        ),
        size: 100,
        filterFn: multiColumnFilterFn,
      },
      {
        header: 'Customer ID',
        accessorKey: 'customerId',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('customerId')}</div>
        ),
        size: 140,
      },
      {
        header: 'Employee ID',
        accessorKey: 'employeeId',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('employeeId')}</div>
        ),
      },
      {
        header: 'Order Date',
        accessorKey: 'orderDate',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('orderDate')}</div>
        ),
      },
      {
        header: 'Required Date',
        accessorKey: 'requiredDate',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('requiredDate')}</div>
        ),
      },
      {
        header: 'Shipped Date',
        accessorKey: 'shippedDate',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shippedDate')}</div>
        ),
      },
      {
        header: 'Ship Via',
        accessorKey: 'shipVia',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipVia')}</div>
        ),
      },
      {
        header: 'Freight',
        accessorKey: 'freight',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('freight')}</div>
        ),
      },
      {
        header: 'Ship Name',
        accessorKey: 'shipName',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipName')}</div>
        ),
        size: 240,
      },
      {
        header: 'Ship Address',
        accessorKey: 'shipAddress',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipAddress')}</div>
        ),
        size: 320,
      },
      {
        header: 'Ship City',
        accessorKey: 'shipCity',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipCity')}</div>
        ),
      },
      {
        header: 'Ship Postal Code',
        accessorKey: 'shipPostalCode',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipPostalCode')}</div>
        ),
      },
      {
        header: 'Ship Country',
        accessorKey: 'shipCountry',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipCountry')}</div>
        ),
      },
      {
        header: 'Ship Region',
        accessorKey: 'shipRegion',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('shipRegion')}</div>
        ),
      },
    ];
  }, []);

  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    rowCount: data?.rowCount,
    state: {
      pagination,
      columnFilters,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    columnResizeMode: 'onChange',
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="space-y-4"
      style={{
        width: table.getCenterTotalSize() - 580,
      }}
    >
      <div className="relative">
        <Input
          id={`${id}-input`}
          ref={inputRef}
          className={cn(
            'peer min-w-60 ps-9',
            Boolean(table.getColumn('id')?.getFilterValue()) && 'pe-9'
          )}
          value={(table.getColumn('id')?.getFilterValue() ?? '') as string}
          onChange={(e) =>
            table.getColumn('id')?.setFilterValue(e.target.value)
          }
          placeholder="Filter..."
          type="text"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              'flex h-full cursor-pointer select-none items-center justify-between gap-2'
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUp
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isFetching ? 'Loading...' : 'No results'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page number information */}
        <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
          <p
            className="whitespace-nowrap text-sm text-muted-foreground"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{' '}
            of{' '}
            <span className="text-foreground">
              {table.getRowCount().toLocaleString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>

              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>

              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>

              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <DrawerDetailOrder
        selectedRow={selectedRow}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
