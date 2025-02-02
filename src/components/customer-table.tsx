'use client';

import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
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
import { DrawerDetailCustomer } from './drawer-detail-customer';

export type Customer = {
  address: string;
  city: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  country: string;
  fax: string;
  id: string;
  phone: string;
  postalCode: string;
  region: string;
};

type Response = {
  rows: Array<Customer>;
  pageCount: number;
  rowCount: number;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Customer> = (
  row,
  _columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.id} ${row.original.companyName} ${row.original.contactName} ${row.original.contactTitle} ${row.original.address} ${row.original.city} ${row.original.postalCode} ${row.original.country} ${row.original.phone} ${row.original.fax} ${row.original.region}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export default function CustomerTable() {
  const id = useId();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Customer>();

  const { isFetching, data } = useQuery<Response>({
    queryKey: ['customers', pagination],
    queryFn: async () => {
      const take = pagination.pageSize;
      const skip = pagination.pageSize * pagination.pageIndex;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/QueryCustomers?take=${take}&include=total&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return {
        rows: data.results,
        pageCount: Math.ceil(data.results.length / pagination.pageSize),
        rowCount: data.total,
      };
    },
  });

  const columns = useMemo<Array<ColumnDef<Customer>>>(() => {
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
        header: 'Company Name',
        accessorKey: 'companyName',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('companyName')}</div>
        ),
        size: 280,
      },
      {
        header: 'Contact Name',
        accessorKey: 'contactName',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('contactName')}</div>
        ),
      },
      {
        header: 'Contact Title',
        accessorKey: 'contactTitle',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('contactTitle')}</div>
        ),
        size: 180,
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('address')}</div>
        ),
        size: 240,
      },
      {
        header: 'City',
        accessorKey: 'city',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('city')}</div>
        ),
      },
      {
        header: 'Postal Code',
        accessorKey: 'postalCode',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('postalCode')}</div>
        ),
      },
      {
        header: 'Country',
        accessorKey: 'country',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('country')}</div>
        ),
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('phone')}</div>
        ),
      },
      {
        header: 'Fax',
        accessorKey: 'fax',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('fax')}</div>
        ),
      },
      {
        header: 'Region',
        accessorKey: 'region',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('region')}</div>
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
        width: table.getCenterTotalSize() - 124,
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

      <DrawerDetailCustomer
        selectedRow={selectedRow}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
