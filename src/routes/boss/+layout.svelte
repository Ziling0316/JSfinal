<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Separator } from '$lib/components/ui/dropdown-menu';
	import { enhance } from '$app/forms';
	import { Pizza, CirclePlus, CircleAlert } from 'lucide-svelte/icons';
	import type { LayoutData } from './$types';
	import type { ActionData } from './$types';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import AddShop from './component/AddShop.svelte';
	import UpdataState from './component/UpdateState.svelte';
	let { data, children, form }: { data: LayoutData; children: any; form: ActionData } = $props();
	// let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<Menubar.Root class="flex w-full justify-between">
	<div>
		<Menubar.Menu>
			<a href="/boss">
				<Menubar.Trigger class="gap-1">
					<Pizza />午餐超人
				</Menubar.Trigger>
			</a>
		</Menubar.Menu>
	</div>
	<div class="flex">
		<Menubar.Menu>
			<Menubar.Trigger class="hover:underline [&[data-state=open]>svg]:rotate-180">
				我的商店
				<ChevronDown class="size-4 shrink-0 transition-transform duration-200" />
			</Menubar.Trigger>
			<Menubar.Content>
				{#if data.stores}
					{#each data.stores as store}
						<a href="/boss/updatemenu?number={store.id}">
							<Menubar.Item class="flex justify-center gap-2">
								{store.store_name}<UpdataState data={store.status} id={store.id} />
							</Menubar.Item>
						</a>
					{/each}
				{:else}
					<!-- {console.log(data.stores)} -->
					<Menubar.Item>暫無商店</Menubar.Item>
				{/if}
				<Separator />
				<Dialog.Root>
					<Dialog.Trigger class="flex w-full justify-center"
						><Menubar.Item><CirclePlus /></Menubar.Item></Dialog.Trigger
					>
					<Dialog.Content>
						<!-- <div class="w-6 bg-black"></div> -->
						<AddShop {form} />
					</Dialog.Content>
				</Dialog.Root>
			</Menubar.Content>
		</Menubar.Menu>

		<Menubar.Menu>
			<form method="POST" action="/boss?/logout">
				<button
					class="inline-flex h-7 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
				>
					登出
				</button>
			</form>
		</Menubar.Menu>
	</div>
</Menubar.Root>
{@render children()}
