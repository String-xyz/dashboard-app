<script lang="ts">
	import ModalBase from '../ModalBase.svelte';

</script>

<ModalBase size="size-md">
	<div class="main flex flex-col justify-center items-center w-full h-full">
		<img src="/assets/indicator/failure.svg" alt="Failure" class="mb-12" />

		<h3 class="text-2xl font-bold">Your invitation hit a roadblock</h3>
		<p class="my-8 text-center">
			Oops, it looks like there was an issue with your invitation. Please try again or contact the
			platform owner to resend you an invitation.
		</p>
		<img src="/assets/string_logo.svg" alt="String" width="76px" height="18px" class="mt-12" />
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 80px;
		padding-right: 80px;
	}
</style>
