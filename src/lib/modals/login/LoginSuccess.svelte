<script lang='ts'>
	import ModalBase from "../ModalBase.svelte";

	import { activeModal } from "$lib/stores";
	import { onMount } from "svelte";

	onMount(() => {
		setTimeout(() => {
			$activeModal = null;
			window.location.href = "/";
		}, 1000);
	});
	
</script>

<ModalBase>
	<div class='flex flex-col justify-center items-center w-full h-full'>
		<img src='/assets/indicator/success.svg' alt='Success' class="mb-12" />

		<h3 class="text-2xl font-bold">You’re in!</h3>
		<p class="my-8">You’re automatically being redirected to your dashboard...</p>
		<img src='/assets/string_logo.svg' alt='String' width="76px" height="18px" class="mt-12" />

	</div>
</ModalBase>