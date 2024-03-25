<script>
	import { Tabs, TabItem, Badge } from 'flowbite-svelte';
	import Blocks from '../components/Tabs/Blocks.svelte';
	import UnconfirmedTxs from '../components/Tabs/UnconfirmedTxs.svelte';
	import LatestTxs from '../components/Tabs/LatestTxs.svelte';
	import { latestTxs } from '../stores/store.js';
</script>

<div class="container mx-auto mt-4">
	<Tabs>
		<TabItem open title="Blocks">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<Blocks />
		</TabItem>
		<TabItem title="Unconfirmed Transactions">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<UnconfirmedTxs />
			</p>
		</TabItem>

		<TabItem title="">
			<div slot="title" class="flex items-center gap-2">
				
				Latest Transactions
				<Badge rounded color="purple">{$latestTxs.length}</Badge>
			  </div>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<LatestTxs />
			</p>
		</TabItem>
	</Tabs>
</div>
