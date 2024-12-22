<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import DataTable from './StoreTable/data-table.svelte';
	import { columns } from './StoreTable/columns';
	// console.log(data.orders);
</script>

<!-- <p>Hi i am boss</p> -->
{#if data.orders.length > 0}
	<DataTable data={data.orders} {columns} />
{:else}
	<p class="p-3">目前沒有訂單喔！</p>
{/if}
