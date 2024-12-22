<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Pizza, Candy } from 'lucide-svelte/icons';
</script>

<Menubar.Root class="flex w-full justify-between">
	<Menubar.Menu>
		<Menubar.Trigger class="gap-1"><Pizza />午餐超人</Menubar.Trigger>
	</Menubar.Menu>

	<Menubar.Menu>
		<Button class="h-7" href="/login">登入</Button>
	</Menubar.Menu>
</Menubar.Root>
<div class="p-3">
	<p class="flex items-center gap-2 font-mono text-2xl">
		歡迎使用<Candy /><span class="font-bold text-red-500">午餐超人</span><Candy /> -
		<span class="text-base"> 幫助您團購午餐的小工具</span>
	</p>
	<br />
	<p class="font-mono text-base text-gray-500">
		還在用google表單統計便當嗎？午餐超人提供您簡單、聰明的工具，幫助您快速完成團購！從此擺脫這個麻煩事！
	</p>
	<br />
	<div class="flex gap-80 pt-4">
		<a href="https://hackmd.io/@ziling/S15042rr1g"
			><Button variant="outline">點我查看使用文件</Button></a
		>
		<img
			src="https://images-tw.girlstyle.com/wp-content/uploads/2020/11/20d13faf.jpeg?auto=format&w=1436"
			alt="IU吃東西"
			class="w-80"
		/>
	</div>
</div>
