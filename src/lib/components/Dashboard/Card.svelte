<script lang="ts">
	import config from '$lib/config';
	import { cards, CARD_NAME, NavItem, type CardItem } from '$lib/constants';
	import { openLink, navigateToView } from '$lib/utils';

	import StyledButton from '../StyledButton.svelte';
	
	export let card: CardItem;

	/* Set cards actions */
	const cardActionMap = new Map<CARD_NAME, () => void>();

	cardActionMap.set(CARD_NAME.unlock_live, () => openLink(config.KYB_URL));
	cardActionMap.set(CARD_NAME.explore_docs, () => openLink(config.DOCS_URL));
	cardActionMap.set(CARD_NAME.manage_team, () => navigateToView(NavItem.MANAGE_TEAM));
	cardActionMap.set(CARD_NAME.create_key, () => navigateToView(NavItem.MANAGE_KEYS));

	cards.forEach((card) => card.action = cardActionMap.get(card.id));
	/* End Set cards actions */
</script>

<div class="card flex flex-col items-center">
	<img src={card.icon} alt={card.iconAlt} width="75px" height="75px" class="my-6" />
	<h4 class="mb-6 text-xl font-bold">{card.title}</h4>
	<p class="text-sm mb-7">{card.subtitle}</p>
	<StyledButton className="btn-outline btn-wide mb-6" action={card.action}>{card.btnText}</StyledButton>
</div>

<style>
	.card {
		width: 30rem;
		border: 2px solid #f2f2f2;
		border-radius: 12px;
	}
</style>
