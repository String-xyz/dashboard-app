<script lang="ts">
	import { Role } from '$lib/types'
	import { teamItems, currentUser } from '$lib/stores'

	import Avatar from '../Avatar.svelte';
	import StyledButton from '../StyledButton.svelte';
	import RoleDropdown from './RoleDropdown.svelte';
	import { apiClient } from '$lib/services';

	const handleResend = async (id: string) => {
		try {
			const res = await apiClient.resendInvite(id);
		} catch (e) {
			console.error('resend invite error', e);
			// TODO: Show notification error
		}
	}
</script>
<div class="members w-full">
	<div class="flex justify-between py-4 font-bold">
		<p class="ml-6">Team</p>
		<p class="mr-6">Access Level</p>
	</div>
	<div>
		{#each $teamItems as member}
			<div class="row flex justify-between items-center p-6 ">
				{#if member.self}
					<div class="flex justify-items-start items-center">
						<Avatar name={member.name} />
						<p class="ml-4 font-semibold">You</p>
					</div>
					<p class="text-sm font-bold">
						{member.role}
					</p>
				{:else}
					<div class="flex justify-items-start items-center">
						<Avatar name={member.name} />
						<div class="ml-4">
							{#if member.isInvite}
								<p class="mb-1 text-sm greyed font-semibold">{member.email}</p>
								<p class="text-xs">Invitation sent!</p>
							{:else}
								<p class="mb-1 text-sm font-semibold">{member.email}</p>
								<p class="text-xs greyed">{member.role} since {member.joinDate}</p>
							{/if}
						</div>
					</div>
					<!-- If they are an admin or above, and it is not an admin trying to modify an admin -->
					{#if $currentUser.role !== Role.MEMBER && $currentUser.role !== member.role}
						<div>
							<RoleDropdown {member} />

							{#if member.isInvite}
								<StyledButton className="rounded-3xl w-32 h-8 mb-0 ml-4" action={() => handleResend(member.id)}>
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

</style>