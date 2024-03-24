<script>
	import { Tabs, TabItem } from 'flowbite-svelte';
</script>

<div class="container mx-auto mt-4">
	<Tabs>
		<TabItem open title="Blocks">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Blocks:</b>
		</TabItem>
		<TabItem title="Transactions">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Latest Transactions:</b>
			</p>
		</TabItem>
		<TabItem title="Unconfirmed Transactions">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Unconfirmed Transactions:</b>
			</p>
		</TabItem>
	</Tabs>
</div>
