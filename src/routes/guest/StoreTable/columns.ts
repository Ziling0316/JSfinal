import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderSnippet } from '$lib/components/ui/data-table/index.js';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Store = {
	id: number;
	store_name: string;
	status: string;
	url: string;
	boss_name: string;
	boss_phone: string;
};

export const columns: ColumnDef<Store>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => {
			const NumberCellSnippet = createRawSnippet<[number]>((getNumber) => {
				const number = getNumber();
				return {
					render: () => {
						// console.log('ID:', number);
						return `<div class="pl-2 font-mono text-gray-500">${number}</div>`;
					}
				};
			});
			return renderSnippet(NumberCellSnippet, row.getValue('id'));
		}
	},
	{
		accessorKey: 'store_name',
		header: 'Store Name',
		cell: ({ row }) => {
			const NameCellSnippet = createRawSnippet<[string]>((getName) => {
				const name = getName();
				return {
					render: () => {
						return `<div class="font-bold">${name}</div>`;
					}
				};
			});
			return renderSnippet(NameCellSnippet, row.getValue('store_name'));
		}
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const StatusCellSnippet = createRawSnippet<[string]>((getStatus) => {
				const status = getStatus();
				return {
					render: () => {
						return status === '營業中'
							? `<div class="text-green-900 font-bold">${status}</div>`
							: `<div class="text-gray-500 font-bold">${status}</div>`;
					}
				};
			});

			return renderSnippet(StatusCellSnippet, row.getValue('status'));
		}
	},
	{
		accessorKey: 'url',
		header: 'Url',
		cell: ({ row }) => {
			const detailCellSnippet = createRawSnippet<[string]>((getDetail) => {
				const detail = getDetail();
				return {
					render: () =>
						`<a href=${detail}><button class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-red-300 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-red-400 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">點我查看詳細資訊</button></a>`
				};
			});

			return renderSnippet(detailCellSnippet, row.getValue('url'));
		}
	},
	{
		accessorKey: 'boss_name',
		header: '老闆姓名',
		cell: ({ row }) => {
			const NameCellSnippet = createRawSnippet<[string]>((getBoss) => {
				const boss = getBoss();
				return {
					render: () => {
						return `<div class="font-bold">${boss}</div>`;
					}
				};
			});
			return renderSnippet(NameCellSnippet, row.getValue('boss_name'));
		}
	},
	{
		accessorKey: 'boss_phone',
		header: '老闆電話',
		cell: ({ row }) => {
			const NameCellSnippet = createRawSnippet<[string]>((getPhone) => {
				const phone = getPhone();
				return {
					render: () => {
						return `<div class="font-bold">${phone}</div>`;
					}
				};
			});
			return renderSnippet(NameCellSnippet, row.getValue('boss_phone'));
		}
	}
];
