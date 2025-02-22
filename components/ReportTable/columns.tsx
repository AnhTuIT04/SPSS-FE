'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export type Report = {
  id: number;
  name: string;
  date: string;
  type: string;
  link: string;
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-right table-cell max-w-40">{row.getValue('id')}</span>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-right w-10 table-cell">{row.getValue('name')}</span>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const formattedDate = date.toLocaleDateString();
      return <span className="text-right font-medium">{formattedDate}</span>;
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue('type');
      const style = type === 'Printing' ? 'status-success' : 'status-pending';

      return (
        <span className={`text-right table-cell ${style}`}>
          {row.getValue('type')}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/spso/report/${row.getValue('id')}`}>
          <Button variant="default" size="icon">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
