<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen w-screen items-center justify-center">
	<Card.Root class="w-80">
		<Card.Header>
			<Card.Title>歡迎登入</Card.Title>
			<Card.Description>即便一無所有，也不能沒有胃口</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/login" use:enhance>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label>Username</Label>
						<Input id="username" name="username" placeholder="不可以有特殊符號" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label>Password</Label>
						<Input id="password" name="password" type="password" />
					</div>
					<div>
						<button
							class="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
							>登入</button
						>
						<a href="register">
							<button
								class="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
								>註冊</button
							>
						</a>
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
		</Card.Footer>
	</Card.Root>
</div>
