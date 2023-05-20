


<script lang="ts">
	import { Role, commonErrorHandler } from "$lib/common";
	import { authService, platformService, type Platform } from "$lib/services";
	import { platformList, currentUser, toast } from "$lib/stores";
	import { formatDate } from "$lib/utils";

	import StyledButton from "../StyledButton.svelte";
	import PlatformDropdown from "./PlatformDropdown.svelte";

	const reactivatePlatform = async (platform: Platform) => {
		try {
			await platformService.reactivatePlatform(platform.id);
			$platformList = await platformService.listPlatforms();

			$toast.show("success", "Game reactivated!");
		} catch (e: any) {
			return commonErrorHandler(e, "game");
		}
	}
	
</script>

<div class="main-table w-full">
	<div class="flex flex-nowrap py-4 px-5 font-bold">
		<p class="w-1/4">Name</p>
		<p class="w-1/4">Description</p>
	</div>
	<div class="rows">
		{#each $platformList as platform}
			<div class="row flex flex-nowrap items-center px-5 py-8 ">
				<div class="w-1/4">
					<p class="font-semibold select-text" class:deactivated={platform.deactivatedAt}>{platform.name}</p>
				</div>
				<div class="w-2/4">
					<p class="font-semibold select-text" class:deactivated={platform.deactivatedAt}>{platform.description}</p>
				</div>
				<div class="w-1/4 flex items-center justify-end info">
					{#if authService.canView($currentUser.role, Role.ADMIN)}
						{#if platform.deactivatedAt}
							<p class="text-xs deactivated font-semibold tabular-nums select-text">Deactivated {formatDate(platform.deactivatedAt)}</p>
							<StyledButton className="btn-warning rounded-3xl ml-6" action={() => reactivatePlatform(platform)}>Reactivate</StyledButton>
						{:else}
							<p class="text-xs font-medium tabular-nums select-text mr-4">Created on {formatDate(platform.createdAt)}</p>
							<PlatformDropdown {platform} />
						{/if}
					{/if}
				</div>
			</div>
		{:else}
			<div class="row flex justify-center items-center p-6">
				<p class="font-bold">No Games Found</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.row {
		border-top: 1px solid #f2f2f2;
	}

	.deactivated {
		color: #bebcba;
	}

	.main-table {
		border: 1px solid #f2f2f2;
		border-radius: 4px;
	}

	@media (max-width: 900px) {
		.row {
			flex-direction: column;
			row-gap: 20px;
			justify-content: center;
			text-align: center;
		}

		.info {
			white-space: nowrap;
			flex-direction: column;
			row-gap: 10px;
		}
	}
</style>
