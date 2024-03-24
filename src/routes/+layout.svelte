<script>
	import '../app.pcss';
	import TopLevelHeader from '../components/TopLevelHeader.svelte';
	import { ticker } from '../stores/store';

	export let data;
	
	$: if (data) {
		ticker.set(data.ticker);
	}
</script>

<svelte:head>
	<title>Sveltekit Demo APP</title>
</svelte:head>

<TopLevelHeader />
<slot />
