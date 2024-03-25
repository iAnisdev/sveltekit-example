<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
	import BlockStream from '../../lib/BlockStreamAPI.js';
	import { writable } from 'svelte/store';

	const blockHeight = writable();
	const blocks = writable([]);
	let blockPulling;

	const sortKey = writable('id'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	$: sortItems = writable($blocks.slice()); // make a copy of the items array

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

	function loadBlocks() {
		let enpoint;
		if ($blockHeight === undefined) {
			enpoint = '/blocks';
		} else {
			enpoint = `/blocks/${$blockHeight}`;
		}
		BlockStream.get(enpoint, {
			params: {
				blockHeight: $blockHeight
			}
		})
			.then((response) => {
				blockHeight.set(response.data.at(-1).height);
				if ($blockHeight === undefined) {
					blocks.set(response.data);
				} else {
					blocks.update((items) => {
						return [...items, ...response.data];
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onMount(() => {
		loadBlocks();
		blockPulling = setInterval(() => {
			loadBlocks();
		}, 3000);
	});

	onDestroy(() => {
		clearInterval(blockPulling);
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
		<TableHeadCell on:click={() => sortTable('id')}>Id</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('height')}>Height</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('timestamp')}>Timestamp</TableHeadCell>
		<TableHeadCell on:click={() => sortTable('tx_count')}>Transactions</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each $sortItems as item}
			<TableBodyRow>
				<TableBodyCell>{item.id}</TableBodyCell>
				<TableBodyCell>{item.height}</TableBodyCell>
				<TableBodyCell>{item.timestamp}</TableBodyCell>
				<TableBodyCell>{item.tx_count}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
