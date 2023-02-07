<script lang="ts">
	import { members } from '$lib/stores'
	import Avatar from '../Avatar.svelte';
	import RoleDropdown from './RoleDropdown.svelte';
</script>
<div class="members w-full">
	<div class="flex justify-between py-4 font-bold">
		<p class="ml-6">Team</p>
		<p class="mr-6">Access Level</p>
	</div>
	<div>
	{#each $members as member}
		<div class="row flex justify-between items-center px-6">
			{#if member.self}
				<div class="flex justify-items-start">
					<Avatar name={member.name} />
					<p>You</p>
				</div>
				<p class="text-sm ml-4">
					{member.role}
				</p>
			{:else}
				<div class="flex justify-items-start">
					<Avatar name={member.name} />
					<div class="ml-4">
						<p class="mb-1">{member.email}</p>
						<p>Member since {member.joinDate}.</p>
					</div>
				</div>
				<RoleDropdown />
			{/if}
		</div>
	{/each}
	</div>
</div>

<style>
	.row {
		border-top: 1px solid #F2F2F2;
	}
	.members {
		border: 1px solid #F2F2F2;
		border-radius: 4px;
	}
</style>