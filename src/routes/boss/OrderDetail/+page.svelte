<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	let total_items: { [key: string]: number } = {};
	let total_price = $state(0);
	for (let i = 0; i < data.orders.length; i++) {
		if (total_items[data.orders[i].item] === undefined) {
			total_items[data.orders[i].item] = 1;
		} else {
			total_items[data.orders[i].item] += 1;
		}
		total_price += data.orders[i].price;
	}
</script>

<div class="flex items-center justify-center pt-4">
	<Card.Root class="w-96">
		<Card.Header>
			<Card.Title class="flex justify-center">訂單內容</Card.Title>
			<!-- <Card.Description>Card Description</Card.Description> -->
		</Card.Header>
		<Card.Content>
			{#each Object.keys(total_items) as item}
				<Label class="flex justify-center">{item} x {total_items[item]}</Label>
			{/each}
			<Separator class="mt-4" />
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<Label>訂單總共價錢：${total_price}</Label>
		</Card.Footer>
	</Card.Root>
</div>
<!-- {console.log(Object.keys(total_items))} -->
