<script>
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { BarLoader } from 'svelte-loading-spinners';
	import { writable } from 'svelte/store';

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Label,
		Input,
		Select,
		Button
	} from 'flowbite-svelte';

	const isLoading = writable(false);

	import { slide } from 'svelte/transition';

	export let data;

	const items = [
		{
			name: 'Apple MacBook Pro 17"',
			color: 'Silver',
			type: 'Laptop',
			price: 2999
		},
		{
			name: 'Microsoft Surface Pro',
			color: 'White',
			type: 'Laptop PC',
			price: 1999
		},
		{
			name: 'Magic Mouse 2',
			color: 'Black',
			type: 'Accessories',
			price: 99
		}
	];
	let Colors = [
		{
			value: 'White',
			name: 'White'
		},
		{
			value: 'Silver',
			name: 'Silver'
		},
		{
			value: 'Black',
			name: 'Black'
		},
		{
			value: 'Red',
			name: 'Red'
		}
	];

	let openRow;
	let details;

	const toggleRow = (i) => {
		openRow = openRow === i ? null : i;
		if (openRow === i) {
			updateForm(i)
		}
	};

	function updateForm(i){
		form.set({
				name: items[i].name,
				color: items[i].color,
				type: items[i].type,
				price: items[i].price
			});
	}

	const { form, errors, message, enhance } = superForm(data.form, {
		// No need for hidden fields with dataType: 'json'
		dataType: 'json',
		async onSubmit({ cancel }) {
			return;
		},

		async onUpdated({ form }) {
			if (form.valid) {
				// data to be sent to the server
				isLoading.set(true);
				items[openRow] = form.data;
				updateForm(openRow);
				setTimeout(() => {
					isLoading.set(false);
				}, 5000);
			}
		}
	});
</script>

<div class="container mx-auto mt-4">
	{#if $message}
		<!-- eslint-disable-next-line svelte/valid-compile -->
		<div class="status" class:error={$page.status >= 400} class:success={$page.status == 200}>
			{$message}
		</div>
	{/if}
	<Table>
		<TableHead>
			<TableHeadCell>Product name</TableHeadCell>
			<TableHeadCell>Color</TableHeadCell>
			<TableHeadCell>Category</TableHeadCell>
			<TableHeadCell>Price</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each items as item, i}
				<TableBodyRow on:click={() => toggleRow(i)}>
					<TableBodyCell>{item.name}</TableBodyCell>
					<TableBodyCell>{item.color}</TableBodyCell>
					<TableBodyCell>{item.type}</TableBodyCell>
					<TableBodyCell>${item.price}</TableBodyCell>
				</TableBodyRow>
				{#if openRow === i}
					<TableBodyRow on:dblclick={() => (details = item)}>
						<TableBodyCell colspan="4" class="p-0">
							<div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
								<form method="POST" use:enhance>
									<div class="mb-6">
										<Label for="name-input" class="mb-2 block">Name</Label>
										<Input
											id="name-input"
											size="lg"
											placeholder="Enter Name"
											bind:value={$form.name}
											aria-invalid={$errors.name ? 'true' : undefined}
										/>
										{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
									</div>
									<div class="mb-6">
										<Label for="color-select" class="mb-2 block">Select a color</Label>
										<Select
											id="type-input"
											class="mt-2"
											items={Colors}
											bind:value={$form.color}
											aria-invalid={$errors.color ? 'true' : undefined}
										/>
										{#if $errors.color}<span class="invalid">{$errors.color}</span>{/if}
									</div>
									<div class="mb-6">
										<Label for="type-input" class="mb-2 block">Type</Label>
										<Input
											id="type-input"
											size="lg"
											placeholder="Enter Type"
											bind:value={$form.type}
											aria-invalid={$errors.type ? 'true' : undefined}
										/>
										{#if $errors.type}<span class="invalid">{$errors.type}</span>{/if}
									</div>
									<div class="mb-6">
										<Label for="price-input" class="mb-2 block">Price</Label>
										<Input
											id="price-input"
											size="lg"
											prefix="$"
											placeholder="Enter Price"
											bind:value={$form.price}
											type="number"
											aria-invalid={$errors.price ? 'true' : undefined}
										/>
										{#if $errors.price}<span class="invalid">{$errors.price}</span>{/if}
									</div>
									<Button color="red" on:click={() => toggleRow(i)} disabled={$isLoading}
										>Cancel</Button
									>
									<Button color="green" type="submit" disabled={$isLoading}>Submit</Button>
								</form>
								{#if $isLoading}
									<div class="mb-4 mt-2">
										<BarLoader size="60" color="#FF3E00" unit="px" duration="1s" />
									</div>
								{/if}
								<SuperDebug data={$form} />
							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/if}
			{/each}
		</TableBody>
	</Table>
</div>

<style>
	.invalid {
		color: red;
	}

	.status {
		color: white;
		padding: 4px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
	}

	.status.success {
		background-color: seagreen;
	}

	.status.error {
		background-color: #ff2a02;
	}

	form {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
</style>
