<script>
	import '../app.pcss';
	import TopLevelHeader from '../components/Shared/TopLevelHeader.svelte';
	import TopLevelFooter from '../components/Shared/TopLevelFooter.svelte';
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
<TopLevelFooter />

