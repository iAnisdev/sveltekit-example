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
		socket = new WebSocket('wss://ws.blockchain.info/inv');
		socket.addEventListener('open', () => {
			socketStatus.set(false);
			socket.send('{"op":"ping"}');

			socket.send('{"op":"unconfirmed_sub"}');
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
