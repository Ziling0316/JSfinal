<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { enhance } from '$app/forms';
	import { CircleAlert } from 'lucide-svelte/icons';
	let { form } = $props();
	const status = ['營業中', '休息中'];
	let value = $state('');
	const triggerContent = $derived(status.find((f) => f === value) ?? 'Choose a state');
</script>

<Card.Root class="h-full">
	<Card.Header>
		<Card.Title>新增商店</Card.Title>
		<CardDescription>請務必全部欄位都填寫完畢，讓午餐超人為您增加訂單</CardDescription>
	</Card.Header>
	<Card.Content>
		<form method="POST" action="/boss?/addShop" use:enhance>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label>商店名稱</Label>
					<Input id="store_name" name="store_name" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label>狀態</Label>
					<Select.Root type="single" name="status" bind:value>
						<Select.Trigger class="w-[180px]">{triggerContent}</Select.Trigger>
						<Select.Content>
							<Select.Item value="休息中">休息中</Select.Item>
							<Select.Item value="營業中">營業中</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label>商店網站連結</Label>
					<Input id="url" name="url" />
				</div>
				<div class="flex justify-center">
					<button
						class="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
						>確定</button
					>
				</div>
			</div>
		</form>
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
