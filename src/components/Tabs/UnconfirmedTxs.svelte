<script>
    import { onMount, onDestroy } from 'svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
    import { LoadUnconfirmedTransactions , unconfirmedTransactions} from '../../stores/store.js';
	import { writable } from 'svelte/store';

	const sortKey = writable('id'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	$: sortItems = writable($unconfirmedTransactions.slice()); // make a copy of the items array

    // Define a function to sort the items
	const sortTable = (key) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

    onMount(() => {
        LoadUnconfirmedTransactions()
    });

    onDestroy(() => {
       unconfirmedTransactions.set([])
    });


	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}
</script>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell on:click={() => sortTable('hash')}>Hash</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('time')}>Timestamp</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('fee')}>Fee</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each $sortItems as item}
			<TableBodyRow>
				<TableBodyCell>{item.hash}</TableBodyCell>
				<TableBodyCell>{new Date(item.time * 1000).toLocaleString()}</TableBodyCell>
				<TableBodyCell>{item.fee}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
