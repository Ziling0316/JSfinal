<script lang="ts">
	import { Smile } from 'lucide-svelte/icons';
	import DataTable from './StoreTable/data-table.svelte';
	import { columns } from './StoreTable/columns';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	console.log(data.data);
</script>

<div class="flex-col pl-3">
	<p class="flex items-center gap-2 font-mono text-2xl">
		<span class="font-bold text-yellow-600">每日金句</span> -
		<span class="flex items-center gap-1 text-base">
			愛吃的人運氣都不會太差，因為「食來運轉」<Smile /></span
		>
	</p>
	{#if data.data.length > 0}
		<DataTable data={data.data} {columns} />
	{:else}
		<p class="pt-3">目前還沒有店家資料喔</p>
	{/if}
</div>
