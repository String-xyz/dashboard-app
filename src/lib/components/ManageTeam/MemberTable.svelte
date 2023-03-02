<script lang="ts">
	import { Role, type TeamItem } from '$lib/types'
	import { teamItems, currentUser } from '$lib/stores'

	import Avatar from '../Avatar.svelte';
	import StyledButton from '../StyledButton.svelte';
	import RoleDropdown from './RoleDropdown.svelte';
	import { apiClient, authService } from '$lib/services';
	import { formatDate } from '$lib/utils';

	const handleResend = async (id: string) => {
		try {
			const res = await apiClient.resendInvite(id);
		} catch (e) {
			console.error('resend invite error', e);
			// TODO: Show notification error
		}
	}

	const reactivateMember = async (member: TeamItem) => {
		try {
			await apiClient.reactivateMember(member.id);
		} catch (e) {
			console.error('reactivate member error', e);
		}
	}

</script>
<div class="members w-full">
	<div class="flex justify-between py-4 font-bold">
		<p class="ml-6">Team</p>
		<p class="mr-6">Access Level</p>
	</div>
	<div class="rows">
		{#each $teamItems as member}
			<div class="row flex justify-between items-center p-6 ">
				{#if member.self}
					<div class="flex justify-items-start items-center">
						<Avatar user={member} />
						<p class="ml-4 font-semibold">You</p>
					</div>
					<p class="text-sm font-bold">
						{member.role}
					</p>
				{:else}
					<div class="flex justify-items-start items-center">
						<Avatar user={member} />
						<div class="ml-4">
							{#if member.isInvite}
								<p class="mb-1 text-sm greyed font-semibold inline-block select-all">{member.email}</p>
								<p class="text-xs">Invitation sent!</p>
							{:else}
								{#if member.deactivatedAt}
									<p class="text-sm text-warning font-semibold inline-block select-all">{member.name}</p>
									<span class="text-xs greyed flex items-center mt-1 ">
										<span class="select-all">{member.email}</span>
										<span class="dot mx-2"></span>
										<span class="select-all">Deactivated {formatDate(member.deactivatedAt)}</span>
									</span>
								{:else}
									<p class="text-sm font-semibold inline-block select-all">{member.name}</p>
									<span class="text-xs greyed flex items-center mt-1 ">
										<span class="select-all">{member.email}</span>
										<span class="dot mx-2"></span>
										<span class="select-all">Joined {member.joinDate}</span>
									</span>
								{/if}
							{/if}
						</div>
					</div>
					{#if member.deactivatedAt && !member.isInvite}
						<div class="flex justify-items-start items-center">
							<p class="text-warning text-sm">Deactivated</p>
							{#if authService.canView($currentUser.role, Role.ADMIN)}
								<StyledButton className="btn-warning rounded-3xl ml-8" action={() => reactivateMember(member)}>Reactivate</StyledButton>
							{/if}
						</div>
					{:else}
						<!-- If they are an admin or above, and it is not an admin trying to modify an admin -->
						{#if authService.canModify($currentUser.role, member.role)}
							<div>
								<RoleDropdown {member} isForInvite={member.isInvite || false} />

								{#if member.isInvite}
									<StyledButton className="rounded-3xl ml-4" action={() => handleResend(member.id)}>
										Resend
										<img src="/assets/button/resend.svg" alt="resend" class="ml-2" />
									</StyledButton>
								{/if}
							</div>
						{:else}
							<p class="text-sm font-bold">
								{member.role}
							</p>
						{/if}
					{/if}
				{/if}
			</div>
		{:else}
			<div class="row flex justify-center items-center p-6">
				<p class="font-bold">No Entries Found</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.row {
		border-top: 1px solid #F2F2F2;
	}

	.greyed {
		color: #BEBCBA;
	}

	.members {
		border: 1px solid #F2F2F2;
		border-radius: 4px;
	}

	.dot {
		border-radius: 50%;
		width: 2px;
		height: 2px;
		background-color: #BEBCBA;
		display: inline-block;
	}

	@media (max-width: 1050px) {
		.row {
			flex-direction: column;
			row-gap: 20px;
		}
	}
</style>