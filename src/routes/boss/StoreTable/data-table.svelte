<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type PaginationState,
		type ColumnFiltersState,
		getCoreRowModel,
		getPaginationRowModel,
		getFilteredRowModel
	} from '@tanstack/table-core';
	import * as Select from '$lib/components/ui/select/index.js';
	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};
	// import { Input } from '$lib/components/ui/input/index.js';
	let value = $state('');
	const title = ['休息中', '營業中'];
	const triggerContent = $derived(title.find((f) => f === value) ?? 'Choose a state');
	let { data, columns }: DataTableProps<TData, TValue> = $props();
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 6 });
	let columnFilters = $state<ColumnFiltersState>([]);
	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		state: {
			get pagination() {
				return pagination;
			},
			get columnFilters() {
				return columnFilters;
			}
		}
	});
</script>

<!-- <div class="flex items-center py-4">
	<Input
		placeholder="Filter names..."
		value={(table.getColumn('store_name')?.getFilterValue() as string) ?? ''}
		onchange={(e) => {
			table.getColumn('store_name')?.setFilterValue(e.currentTarget.value);
		}}
		oninput={(e) => {
			table.getColumn('store_name')?.setFilterValue(e.currentTarget.value);
		}}
		class="max-w-sm"
	/>
	<Select.Root
		type="single"
		onValueChange={(e) => {
			table.getColumn('status')?.setFilterValue(e);
		}}
		bind:value
	>
		<Select.Trigger class="w-[180px]">{triggerContent}</Select.Trigger>
		<Select.Content>
			<Select.Item value="休息中">休息中</Select.Item>
			<Select.Item value="營業中">營業中</Select.Item>
		</Select.Content>
	</Select.Root>
</div> -->

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<div class="flex items-center justify-end space-x-2 py-4">
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.previousPage()}
		disabled={!table.getCanPreviousPage()}
	>
		Previous
	</Button>
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.nextPage()}
		disabled={!table.getCanNextPage()}
	>
		Next
	</Button>
</div>
