


<script lang="ts">
	import { Role } from "$lib/common";
	import { authService } from "$lib/services";
	import { platformList, currentUser } from "$lib/stores";
	import { formatDate } from "$lib/utils";

	import PlatformDropdown from "./PlatformDropdown.svelte";
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
						<p class="text-xs font-medium tabular-nums select-text mr-4" class:deactivated={platform.deactivatedAt}>Created on {formatDate(platform.createdAt)}</p>
						{#if !platform.deactivatedAt}
							<PlatformDropdown {platform} />
						{/if}
					{/if}
				</div>
			</div>
		{:else}
			<div class="row flex justify-center items-center p-6">
				<p class="font-bold">No Platforms Found</p>
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
