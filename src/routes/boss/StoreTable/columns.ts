import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderSnippet } from '$lib/components/ui/data-table/index.js';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Orders = {
	id: number;
	store_name: string;
	main_person: string;
	main_person_phone: string;
	detail: string;
	status: string;
};

export const columns: ColumnDef<Orders>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => {
			const NumberCellSnippet = createRawSnippet<[number]>((getNumber) => {
				const store_id = getNumber();
				return {
					render: () => {
						// console.log('ID:', number);
						return `<div class="pl-2 font-mono text-stone-500">${store_id}</div>`;
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
				const store_name = getName();
				return {
					render: () => {
						return `<div class="font-bold">${store_name}</div>`;
					}
				};
			});
			return renderSnippet(NameCellSnippet, row.getValue('store_name'));
		}
	},
	{
		accessorKey: 'main_person',
		header: '負責人',
		cell: ({ row }) => {
			const NameCellSnippet = createRawSnippet<[string]>((getName) => {
				const name = getName();
				return {
					render: () => {
						return `<div class="font-bold">${name}</div>`;
					}
				};
			});
			return renderSnippet(NameCellSnippet, row.getValue('main_person'));
		}
	},
	{
		accessorKey: 'main_person_phone',
		header: '負責人電話',
		cell: ({ row }) => {
			const NameCellSnippet = createRawSnippet<[string]>((getPhone) => {
				const phone = getPhone();
				return {
					render: () => {
						return `<div class="font-bold">${phone}</div>`;
					}
				};
			});
			return renderSnippet(NameCellSnippet, row.getValue('main_person_phone'));
		}
	},
	{
		accessorKey: 'detail',
		header: '訂單詳細內容',
		cell: ({ row }) => {
			const DetailCellSnippet = createRawSnippet<[string]>((getID) => {
				const id = getID();
				return {
					render: () => {
						return (
							'<a href=' +
							`http://localhost:5173/boss/OrderDetail/?order_id=${id}` +
							'><button class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-red-300 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-red-400 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">查看訂單</button></a>'
						);
					}
				};
			});

			return renderSnippet(DetailCellSnippet, row.getValue('id'));
		}
	},
	{
		accessorKey: 'status',
		header: '訂單目前狀態',
		cell: ({ row }) => {
			const StatusCellSnippet = createRawSnippet<[string]>((getStatus) => {
				const status = getStatus();
				const id = row.getValue('id');
				return {
					render: () => {
						return status === '結單'
							? `<div class="text-red-600 font-bold">${status}` +
									`<form method="POST" action="/boss?/changeStatus"><input type = "hidden" name = "id" value = ${id} /><button class="text-black inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-amber-400 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-amber-500 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">修改訂單狀態</button></form></div>`
							: `<div class="text-blue-800 font-bold">${status}` +
									`<form method="POST" action="/boss?/changeStatus"><input type = "hidden" name = "id" value = ${id} /><button class="text-black inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-amber-400 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-amber-500 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">修改訂單狀態</button></form></div>`;
					}
				};
			});
			return renderSnippet(StatusCellSnippet, row.getValue('status'));
		}
	}
];
