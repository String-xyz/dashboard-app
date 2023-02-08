<script lang="ts">
	import FilterDropdown from '$lib/components/ManageTeam/FilterDropdown.svelte';
	import MemberTable from '$lib/components/ManageTeam/MemberTable.svelte';
	import StyledButton from '$lib/components/StyledButton.svelte';
	import InviteTeammate from '$lib/modals/team/InviteTeammate.svelte';

	import { activeModal, Role, currentUser } from '$lib/stores';

	const inviteMember = () => {
		$activeModal = InviteTeammate;
	}

</script>

<div class="main h-full">
	<header>
		<div class="flex justify-between items-center">
			<h3 class="text-2xl font-bold">Manage Team</h3>
			{#if $currentUser.role !== Role.MEMBER}
				<StyledButton className="btn-outline !m-0 w-40" action={inviteMember}>
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
</div>

<style>
	.main {
		padding: 70px;
		overflow: none;
	}

</style>
