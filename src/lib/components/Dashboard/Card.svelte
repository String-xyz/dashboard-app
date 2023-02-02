<script lang="ts">
	import type { CardItem } from '$lib/stores';
	import StyledButton from '../StyledButton.svelte';
	export let card: CardItem;
</script>

<div class="card flex flex-col items-center">
	<img src={card.icon} alt={card.iconAlt} width="75px" height="75px" class="my-6" />
	<h4 class="mb-6 text-xl font-bold">{card.title}</h4>
	<p class="text-sm mb-7">{card.subtitle}</p>
	<StyledButton className="btn-outline btn-wide" action={card.action}>{card.btnText}</StyledButton>
</div>

<style>
	.card {
		width: 30rem;
		border: 2px solid #f2f2f2;
		border-radius: 12px;
	}
</style>
