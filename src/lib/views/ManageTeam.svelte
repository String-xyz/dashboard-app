<script lang="ts">
	import { onMount } from "svelte";
	import { NavItem, Filter } from "$lib/constants";
	import { Role, commonErrorHandler } from "$lib/common";
	import { authService, teamService } from "$lib/services";
	import { currentUser, inviteModalOpen, memberList, activeFilter, toast } from "$lib/stores";

	import FilterDropdown from "$lib/components/ManageTeam/FilterDropdown.svelte";
	import MemberTable from "$lib/components/ManageTeam/MemberTable.svelte";
	import StyledButton from "$lib/components/StyledButton.svelte";
	import Toast from "$lib/components/Toast.svelte";

	onMount(async () => {
		// subscribe to filter changes so we can update the member table
		activeFilter.subscribe(async (filter) => ($memberList = await teamService.rebuildTeamList()));

		try {
			$activeFilter.filter = Filter.ALL_MEMBERS;
		} catch (e: any) {
			return commonErrorHandler(e, "members");
		}
	});
</script>

<svelte:head>
	<title>{NavItem.MANAGE_TEAM} | String Dashboard</title>
</svelte:head>

<div class="main h-full">
	<header>
		<div class="header flex justify-between items-center">
			<h3 class="text-2xl font-bold">{NavItem.MANAGE_TEAM}</h3>
			{#if authService.canView($currentUser.role, Role.ADMIN)}
				<StyledButton className="btn-outline" action={() => ($inviteModalOpen = true)}>
					<img src={"/assets/button/plus.svg"} alt="+" class="inline mr-3" />
					Invite Member
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
