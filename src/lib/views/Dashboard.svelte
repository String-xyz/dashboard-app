<script lang="ts">
	import { cards } from "$lib/constants/cards";
	import { toast, currentUser } from "$lib/stores";

	import Card from "$lib/components/Dashboard/Card.svelte";
	import Toast from "$lib/components/Toast.svelte";
</script>

<svelte:head>
	<title>Dashboard | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<h3 class="text-2xl font-bold">Welcome {$currentUser.name?.split(' ')[0] ?? ""}!</h3>
	<div class="divider mb-6" />

	<div class="flex justify-center items-center w-full">
		<div class="grid gap-6 gap-x-10">
			{#each cards as card}
				<Card {card} />
			{/each}
		</div>
	</div>

	<Toast type={$toast.type} size="sm" bind:display={$toast._display}>{$toast.message}</Toast>
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
