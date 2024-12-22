<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	let { data, id } = $props();
	let value = $state(data);
	async function handleValueChange() {
		try {
			const response = await fetch('/api/update-status', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id, status: value })
			});

			const result = await response.json();
			if (!response.ok) {
				console.error(result.message);
			}
		} catch (error) {
			console.error('提交失敗，請稍後再試。', error);
		}
	}
</script>

<Select.Root type="single" name="status" bind:value onValueChange={handleValueChange}>
	<Select.Trigger class="h-fit w-fit">{value}</Select.Trigger>
	<Select.Content>
		<Select.Item value="休息中">休息中</Select.Item>
		<Select.Item value="營業中">營業中</Select.Item>
	</Select.Content>
</Select.Root>
