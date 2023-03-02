<script lang="ts">
	import { cards } from '$lib/constants/cards';
	import Card from '$lib/components/Dashboard/Card.svelte';

	// import { onMount } from 'svelte';
	// import Toast from '$lib/components/Toast.svelte';

	// let showSuccessToast: () => void;

	// onMount(() => {
	// 	showSuccessToast();
	// })
</script>

<svelte:head>
	<title>Dashboard | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<h3 class="text-2xl font-bold">Let’s get you started!</h3>
	<div class="divider mb-6" />

	<div class="flex justify-center items-center w-full">
		<div class="grid gap-6 gap-x-10">
			{#each cards as card}
				<Card {card} />
			{/each}
		</div>
	</div>

	<!-- <Toast type="success" size="sm" bind:show={showSuccessToast}>This is a test </Toast> -->
</div>

<style>
	.main {
		padding: 70px;
	}

	.grid {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 1300px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

</style>
