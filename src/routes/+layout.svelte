<script>
	import { onDestroy, onMount } from 'svelte';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import '../app.pcss';
	import TopLevelHeader from '../components/Shared/TopLevelHeader.svelte';
	import TopLevelFooter from '../components/Shared/TopLevelFooter.svelte';
	import { socketStatus, latestTxs, ticker } from '../stores/store';

	export let data;
	let socket;

	$: if (data) {
		ticker.set(data.ticker);
	}

	onMount(() => {
		socketStatus.set(false);
		socket = new WebSocket('wss://ws.blockchain.info/inv');
		socket.addEventListener('open', () => {
			// Send ping to confirm connection
			socket.send('{"op":"ping"}');
			// Subscribe to unconfirmed transactions
			socket.send('{"op":"unconfirmed_sub"}');
			// Subscribe to new blocks
			socket.send('{"op":"blocks_sub"}');
		});
		socket.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			if (data.op === 'pong') {
				socketStatus.set(true);
				toasts.add({
					title: 'Success',
					description: 'Socket connected.',
					duration: 10000, // 0 or negative to avoid auto-remove
					placement: 'top-right',
					type: 'info',
					theme: 'dark',
					type: 'success'
				});
			} else if (data.op === 'utx') {
				latestTxs.update((txs) => {
					txs.unshift(data.x);
					return txs;
				});
			} else if (data.op === 'block') {
				toasts.add({
					title: 'New Block',
					description: `Block ${data.x.height} mined at ${new Date(data.x.time * 1000).toLocaleString()}`,
					duration: 10000, // 0 or negative to avoid auto-remove
					placement: 'top-right',
					type: 'info',
					theme: 'dark',
					type: 'success'
				});
			}
		});
		socket.addEventListener('close', () => {
			socketStatus.set(false);
		});
		socket.addEventListener('error', (error) => {
			console.error('Error:', error);
			socketStatus.set(false);
		});
	});
	onDestroy(() => {
		if (socket !== undefined && socket.readyState === 1) {
			socket.send('{"op":"unconfirmed_unsub"}');
			socket.send('{"op":"blocks_unsub"}');
			socket.close();
		}
	});
</script>

<svelte:head>
	<title>Sveltekit Demo APP</title>
</svelte:head>

<TopLevelHeader />
<slot />
<TopLevelFooter />

<ToastContainer placement="top-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>
