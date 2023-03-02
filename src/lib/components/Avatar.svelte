<script lang="ts">
	import { onMount } from "svelte";

	import type { TeamItem } from "$lib/types";
	import type { Member } from "$lib/services";

	export let user: TeamItem | Member;
	export let type: 'self' | 'other' = 'self';
	export let className = '';

	const assetPathSelf = '/assets/avatar/self';
	const assetPathOther = '/assets/avatar/other';
	
	const path = type === 'self' ? assetPathSelf : assetPathOther;
	
	let initial = '';
	let name = '';

	onMount(() => {
		name = user.name || user.email;

		if ("isInvite" in user && user.isInvite) {
			initial = `${assetPathOther}/invite_sent.svg`
		} else {
			const firstInitial = name?.charAt(0)?.toUpperCase();
			initial = `${path}/${firstInitial}.svg`;
		}
	});
</script>

{#if name}
	<img src={initial} alt="profile" class={className} />
{/if}
