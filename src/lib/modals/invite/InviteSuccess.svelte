<script lang="ts">
	import ModalBase from '../ModalBase.svelte';
	import { _invite } from '$lib/stores';
</script>

<ModalBase size="size-md">
	<div class="flex flex-col justify-center items-center w-full h-full">
		<img src="/assets/indicator/success.svg" alt="success" class="mb-12" />

		<h3 class="text-2xl font-bold">You’ve successfully onboarded to</h3>
		<h3 class="text-2xl font-bold">{$_invite.platformName}</h3>
		<p class="my-8">You’re automatically being redirected to your dashboard...</p>
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mt-12" />
	</div>
</ModalBase>
