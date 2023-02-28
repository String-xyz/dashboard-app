<script lang="ts">
	import StyledButton from "./StyledButton.svelte";

	export let type: "error" | "success";
	export let size: "lg" | "sm" = "lg";
	export let action: (() => void) | null = null;
	export let actionText = "Action";
	export let durationMs = 50000;
	export let visible = false;

	let timeout: NodeJS.Timeout;
	export const show = () => {
		if (timeout) clearTimeout(timeout);

		visible = true;
		timeout = setTimeout(() => {
			visible = false;
		}, durationMs);
	}

	const assetPath = "/assets/toast/";

	// [src, alt text]
	const errorIcon = [assetPath + "error.svg", "error"];
	const successIcon = [assetPath + "success.svg", "success"];

	$: icon = type === "error" ? errorIcon[0] : successIcon[0];
	$: iconAlt = type === "error" ? errorIcon[1] : successIcon[1];

	const close = () => {
		clearTimeout(timeout);
		visible = false;
	}

</script>

{#if visible}
	<div class="toast toast-end justify-between items-center flex-row p-4 mr-4"
		class:toast-error={type === "error"}
		class:toast-success={type === "success"}
		class:toast-lg={size === "lg"}
		class:toast-sm={size === "sm"}
	>
		<div class="flex items-center">
			<img src={icon} alt={iconAlt} class="mr-2 inline"/>
			<slot class="text-black text-sm break-words" />	
		</div>
		<div class="flex items-center">
			{#if action}
				<StyledButton className="btn-outline capitalize btn-black h-9" {action}>{actionText}</StyledButton>
			{/if}
			<button on:click={close} class="ml-4">
				<img src={assetPath + "close.svg"} alt="close" />
			</button>
		</div>
	</div>
{/if}


<style>
	.toast-lg {
		width: 33%;
		max-width: 33%;
	}
	
	.toast-sm {
		width: 15%;
		max-width: 15%;
	}

	.toast-error {
		background-color: #FFF6F8;
		border: 1px solid #FFA7A0;
		border-left: 4px solid #F44336;
	}

	.toast-success {
		background-color: #EEFFF3;
		border: 1px solid #B1E4BF;
		border-left: 4px solid #23A047;
	}
</style>