<script lang='ts'>
	import Card from "$lib/components/Dashboard/Card.svelte";
	import { cards } from '$lib/stores'
	import { onMount } from "svelte";

	onMount(() => {
		console.log('--2222 Loading dashboard...')
	})
</script>

<div class="main">
	<h3 class="text-2xl">Let’s get you started!</h3>
	<div class="divider mb-6" />

	<div class="flex justify-center items-center w-full">
		<div class="grid gap-6 gap-x-10">
			{#each cards as card}
				<Card {card} />
			{/each}
		</div>
	</div>
</div>

<style>
	.main {
		padding: 70px;
	}
	
	.grid {
		grid-template-columns: repeat(2, 1fr);
	}
</style>