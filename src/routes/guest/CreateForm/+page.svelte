<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Beer from 'lucide-svelte/icons/beer';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	let value = $state('');
	let { data, form }: { data: PageData; form: ActionData } = $props();
	const triggerContent = $derived(data.store.find((f) => f.store_name === value) ?? data.store[0]);
</script>

<div class="flex justify-center">
	<form method="POST" action="?/CreateForm" use:enhance>
		<Card.Root class="w-96">
			<Card.Header>
				<Card.Title class="flex items-center gap-2"><Beer />我要揪團甲奔<Beer /></Card.Title>
				<!-- <Card.Description>Card Description</Card.Description> -->
			</Card.Header>
			<Card.Content class="flex flex-col gap-4">
				<div class="flex w-full items-center">
					<Label class="w-20">揪團人：</Label>
					<Input name="main_person" placeholder="不可以有特殊符號" />
				</div>
				<div class="flex w-full items-center">
					<Label class="w-36">揪團人電話：</Label>
					<Input name="phone" placeholder="請輸入您的電話" />
				</div>
				<div class="flex w-full items-center">
					<Label class="w-48">您想訂購的商家：</Label>
					<Select.Root type="single" name="store_name" bind:value>
						<Select.Trigger class="">{triggerContent.store_name}</Select.Trigger>
						<Select.Content>
							{#each data.store as store}
								<Select.Item value={store.store_name}>{store.store_name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex w-full items-center">
					<Label class="w-48">訂單截止時間：</Label>
					<Input name="time" type="time" />
				</div>
				<Separator />
				<div class="flex justify-center">
					<button
						class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
						>建立訂單</button
					>
				</div>
			</Card.Content>
			<Card.Footer>
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
