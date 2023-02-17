<script lang="ts">
	import { onMount } from "svelte";

	export let name: string;
	export let type: 'self' | 'other' = 'self';
	export let className = '';

	const assetPathSelf = '/assets/avatar/self';
	const assetPathOther = '/assets/avatar/other';

	
	const path = type === 'self' ? assetPathSelf : assetPathOther;
	
	let initial = '';
	
	onMount(() => {
		if (!name) name = 'A'; // set A as default value when user does not provide a name

		const firstInitial = name?.charAt(0)?.toUpperCase();
		initial = `${path}/${firstInitial}.svg`;
	});
</script>

{#if name}
	<img src={initial} alt="profile" class={className} />
{/if}
