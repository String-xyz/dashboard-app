<script lang="ts">
	import Toast from "$lib/components/Toast.svelte";
	import { toast } from "$lib/stores";

	export let size = "size-lg";
</script>

<div
	class="str-modal text-neutral border border-neutral"
	class:size-xl={size === "size-xl"}
	class:size-lg={size === "size-lg"}
	class:size-md={size === "size-md"}
	class:size-sm={size === "size-sm"}
>
	<div class="content w-full h-full">
		<slot />
	</div>

	<Toast type={$toast.type} size="sm" bind:show={$toast._show}>{$toast.message}</Toast>
</div>

<style>
	.str-modal {
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		background: white;
		width: 600px;
	}

	.size-xl {
		height: 650px;
	}

	.size-lg {
		height: 600px;
	}

	.size-md {
		height: 550px;
	}

	.size-sm {
		height: 440px;
	}
</style>
