<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import '../app.pcss';
	import TopLevelHeader from '../components/Shared/TopLevelHeader.svelte';
	import TopLevelFooter from '../components/Shared/TopLevelFooter.svelte';
	import { socketStatus, ticker } from '../stores/store';

	export let data;
	let socket;

	$: if (data) {
		ticker.set(data.ticker);
	}

	onMount(() => {
		socket = new WebSocket('wss://ws.blockchain.info/inv');
		socket.addEventListener('open', () => {
			console.log('Opened');
			socketStatus.set(false);
			socket.send('{"op":"ping"}');

			socket.send('{"op":"unconfirmed_sub"}');
		});
		socket.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			if (data.op === 'open') {
				socketStatus.set(true);
			}
			console.log('message', data);
		});
		socket.addEventListener('close', () => {
			console.log('Closed');
			socketStatus.set(false);
		});
		socket.addEventListener('error', (error) => {
			console.error('Error:', error);
			socketStatus.set(false);
		});
	});
</script>

<svelte:head>
	<title>Sveltekit Demo APP</title>
</svelte:head>

<TopLevelHeader />
<slot />
<TopLevelFooter />
