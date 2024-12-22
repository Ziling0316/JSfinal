import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderSnippet } from '$lib/components/ui/data-table/index.js';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Store = {
	id: number;
	store_id: number;
	store_name: string;
	main_person: string;
	main_person_phone: string;
	status: string;
	time: number;
	add_button: string;
};

export const columns: ColumnDef<Store>[] = [
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
		header: '揪團人',
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
		header: '揪團人電話',
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
		accessorKey: 'time',
		header: '訂單截止時間',
		cell: ({ row }) => {
			const TimeCellSnippet = createRawSnippet<[number]>((getTime) => {
				const time = getTime();
				const date = new Date(time);
				const datevalues = [
					date.getFullYear(),
					date.getMonth() + 1,
					date.getDate(),
					date.getHours(),
					date.getMinutes(),
					date.getSeconds()
				];
				return {
					render: () => {
						return `<div class="font-bold">${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}</div>`;
					}
				};
			});

			return renderSnippet(TimeCellSnippet, row.getValue('time'));
		}
	},
	{
		accessorKey: 'status',
		header: '訂單目前狀態',
		cell: ({ row }) => {
			const StatusCellSnippet = createRawSnippet<[string]>((getStatus) => {
				const status = getStatus();
				return {
					render: () => {
						return status === '進行中'
							? `<div class="text-green-800 font-bold">${status}</div>`
							: status === '結單'
								? `<div class="text-red-600 font-bold">${status}</div>`
								: `<div class="text-blue-800 font-bold">${status}</div>`;
					}
				};
			});
			return renderSnippet(StatusCellSnippet, row.getValue('status'));
		}
	},
	{
		// accessorKey: 'url',
		header: '我也想參一咖',
		cell: ({ row }) => {
			const AddCellSnippet = createRawSnippet<[string]>((getNumber) => {
				const id = getNumber();
				const status = row.getValue('status');
				return {
					render: () =>
						status === '進行中'
							? '<a href=' +
								`http://localhost:5173/guest/Addorder/?order_id=${id}` +
								'><button class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-red-300 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-red-400 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">加入訂單</button></a>'
							: '<a href=' +
								`http://localhost:5173/guest/Addorder/?order_id=${id}` +
								'><button disabled class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-red-300 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-red-400 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">加入訂單</button></a>'
				};
			});

			return renderSnippet(AddCellSnippet, row.getValue('id'));
		}
	}
];
