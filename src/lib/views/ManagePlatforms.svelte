<script lang="ts">
	import { onMount } from "svelte";
	import { Role } from "$lib/common";
	import { platformService, authService } from "$lib/services";
	import { platformCreateModalOpen, platformList, toast, currentUser } from "$lib/stores";

	import StyledButton from "$lib/components/StyledButton.svelte";
	import PlatformTable from "$lib/components/ManagePlatforms/PlatformTable.svelte";
	import Toast from "$lib/components/Toast.svelte";

	onMount(async () => {
		try {
			$platformList = await platformService.listPlatforms();
		} catch (e) {
			console.error(e);
			$toast.show("error", "Error fetching platforms");
		}
	});

	const createPlatform = async () => {
		$platformCreateModalOpen = !$platformCreateModalOpen;
	}

</script>

<svelte:head>
	<title>Manage Games | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="header flex justify-between items-center">
			<h3 class="text-2xl font-bold">Manage Games</h3>
			{#if authService.canView($currentUser.role, Role.ADMIN)}
				<StyledButton className="btn-outline" action={createPlatform}>
					<img src={"/assets/button/plus.svg"} alt="+" class="inline mr-3" />
					New Game
				</StyledButton>
			{:else}
				<span class="text-sm">
					<img src="/assets/info.svg" alt="info" class="inline mr-2" />
					Members do not have permission to manage Games.
				</span>
			{/if}
		</div>
	</header>
	<div class="divider mt-4 mb-12" />

	<PlatformTable />

	<Toast type={$toast.type} size="sm" bind:display={$toast._display}>{$toast.message}</Toast>
</div>

<style>
	.main {
		padding: 70px;
		overflow: none;
	}

	@media (max-width: 800px) {
		.header {
			flex-direction: column;
			row-gap: 20px;
		}
	}
</style>
