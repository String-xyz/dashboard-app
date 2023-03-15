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
	
	let pfp = "";
	$: name = user.name || user.email;

	$: {
		if ("isInvite" in user && user.isInvite) {
			pfp = `${assetPathOther}/invite_sent.svg`
		} else {
			const firstinitial = name?.charAt(0)?.toUpperCase();
			pfp = `${path}/${firstinitial}.svg`;
		}
	}
</script>

{#if pfp}
	<img src={pfp} alt="profile" class={className} />
{/if}
