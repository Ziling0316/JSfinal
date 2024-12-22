<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Separator } from '$lib/components/ui/dropdown-menu/index.js';
	import { Pizza } from 'lucide-svelte/icons';

	let { children } = $props();
</script>

<Menubar.Root class="mb-6 flex w-full justify-between">
	<div>
		<Menubar.Menu>
			<a href="/guest"
				><Menubar.Trigger class="gap-1 ">
					<Pizza />午餐超人
				</Menubar.Trigger></a
			>
		</Menubar.Menu>
	</div>
	<div class="flex">
		<Menubar.Menu>
			<Menubar.Trigger class="hover:underline [&[data-state=open]>svg]:rotate-180">
				揪團吃午餐
				<ChevronDown class="size-4 shrink-0 transition-transform duration-200" />
			</Menubar.Trigger>
			<Menubar.Content>
				<a href="http://localhost:5173/guest/CreateForm"><Menubar.Item>建立訂單</Menubar.Item></a>
				<Separator />
				<a href="http://localhost:5173/guest/TrackForm"><Menubar.Item>追蹤訂單</Menubar.Item></a>
			</Menubar.Content>
		</Menubar.Menu>

		<Menubar.Menu>
			<form method="POST" action="?/logout">
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
