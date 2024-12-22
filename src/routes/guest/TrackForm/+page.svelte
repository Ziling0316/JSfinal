<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './StoreTable/data-table.svelte';
	import { columns } from './StoreTable/columns';
	// let { order }: { order: PageData['get_order'] } = $props();
	let { data }: { data: PageData } = $props();
	// console.log(data.order);
</script>

{#if data.order.length > 0}
	<DataTable data={data.order} {columns} />
{:else}
	<p class="p-3">目前沒有人揪團訂餐喔！</p>
{/if}
