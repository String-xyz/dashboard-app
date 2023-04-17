<script lang="ts">
	import { onMount } from "svelte";
	import { Role } from "$lib/common/types";
	import { teamService } from "$lib/services";
	import { commonErrorHandler } from "$lib/common/errors";
	import { currentUser, inviteModalOpen, teamItems, activeFilter, Filter, toast } from "$lib/stores";

	import FilterDropdown from "$lib/components/ManageTeam/FilterDropdown.svelte";
	import MemberTable from "$lib/components/ManageTeam/MemberTable.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import Toast from "$lib/components/Toast.svelte";

	$: canEdit = $currentUser.role !== Role.MEMBER;

	onMount(async () => {
		// subscribe to filter changes so we can update the member table
		activeFilter.subscribe(async (filter) => ($teamItems = await teamService.rebuildTeamList()));

		try {
			$activeFilter.filter = Filter.ALL_MEMBERS;
		} catch (e: any) {
			return commonErrorHandler(e, "members");
		}
	});
</script>

<svelte:head>
	<title>Manage Team | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="header flex justify-between items-center">
			<h3 class="text-2xl font-bold">Manage Team</h3>
			{#if canEdit}
				<StyledButton className="btn-outline w-40" action={() => ($inviteModalOpen = true)}>
					<img src={"/assets/button/plus.svg"} alt="+" class="inline mr-3" />
					Invite Team
				</StyledButton>
			{:else}
				<span class="text-sm">
					<img src="/assets/info.svg" alt="info" class="inline mr-2" />
					Members do not have permission to edit team access.
				</span>
			{/if}
		</div>
		<div class="divider my-4" />
	</header>
	<div class="flex w-full">
		<div class="ml-auto mb-4">
			<span class="mr-5 text-sm">Filter by</span>
			<FilterDropdown />
		</div>
	</div>

	<MemberTable />

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
