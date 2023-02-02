<script lang="ts">
	import ModalBase from '../ModalBase.svelte';

	import Login from '../login/Login.svelte';

	import { activeModal } from '$lib/stores';

	const backToLogin = () => {
		$activeModal = Login;
	}

</script>

<ModalBase size="size-sm">
	<div class="main flex flex-col justify-center items-center w-full h-full">
		<img src="/assets/indicator/failure.svg" alt="Failure" class="mb-8" />

		<h3 class="text-2xl font-bold mb-12">Let’s try that again...</h3>
		<p class="mb-12 text-center">
			Oops, it looks like there was an issue with resetting your password. Please try again
		</p>

		<button on:click={backToLogin}>
			<span>
				<img src="/assets/button/left_arrow.svg" alt="<-" class="mr-2 inline" />
				Back to log in
			</span>
		</button>
	</div>
</ModalBase>

<style>
	.main {
		padding-left: 80px;
		padding-right: 80px;
	}
</style>
