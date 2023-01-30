<script lang="ts">
	import type { Card } from '$lib/stores'
	export let card: Card;
</script>

<div class="card">
	<img src={card.icon} alt={card.iconAlt} />
</div>