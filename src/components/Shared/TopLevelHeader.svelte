<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Badge } from 'flowbite-svelte';
	import { socketStatus, ticker } from '../../stores/store.js';

	$: values = $ticker;
</script>

<Navbar color="primary">
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold">BTC Rate Today <Badge rounded color={socketStatus ? 'green' : 'red'}>{socketStatus ? 'Active' : 'InActive'}</Badge></span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi disabled>$: {values?.usd}</NavLi>
		<NavLi disabled>€: {values?.eur}</NavLi>
		<NavLi disabled>£: {values?.gbp}</NavLi>
	</NavUl>
</Navbar>
