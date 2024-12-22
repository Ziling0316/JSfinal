<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import { enhance } from '$app/forms';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import type { PageData } from '../$types';
	import type { ActionData } from '../$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	// console.log(total_price);
</script>

<div class="flex justify-center">
	<form method="POST" action="?/AddForm" use:enhance>
		<Card.Root class="w-96">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">算我一份</Card.Title>
				<!-- <Card.Description>Card Description</Card.Description> -->
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="flex w-full items-center">
					<Label class="w-20">姓名：</Label>
					<Input name="name" placeholder="不可以有特殊符號" />
				</div>
				<div class="w-full flex-col">
					<Label class="w-20">想吃什麼：</Label>
					<RadioGroup.Root class="pt-2" value={data.menu[0].item} name="item">
						{#each data.menu as item}
							<div>
								<RadioGroup.Item value={item.item} />
								<Label>{item.item} ${item.price}</Label>
							</div>
						{/each}
					</RadioGroup.Root>
				</div>
				<div class="flex justify-center">
					<button
						class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
						>確定</button
					>
				</div>
			</Card.Content>
			<Card.Footer>
				<!-- <p>{data.total_price}</p> -->
				{#if form?.message}
					<Alert.Root variant="destructive" class="mt-4">
						<CircleAlert class="size-4 shrink-0" />
						<Alert.Title>Error</Alert.Title>
						{form.message}
					</Alert.Root>
				{/if}
				{#if form === 200}
					<Alert.Root variant="default" class="mt-4">
						<CircleAlert class="size-4 shrink-0" />
						<Alert.Title>Success</Alert.Title>
					</Alert.Root>
				{/if}
			</Card.Footer>
		</Card.Root>
	</form>
</div>
