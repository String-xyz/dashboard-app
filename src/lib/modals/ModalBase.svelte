<script lang="ts">
	export let size = 'size-lg';

</script>

<div
	class="str-modal text-neutral border border-neutral"
	class:size-xl={size === 'size-xl'}
	class:size-lg={size === 'size-lg'}
	class:size-md={size === 'size-md'}
	class:size-sm={size === 'size-sm'}
>
	<div class="content w-full h-full">
		<slot />
	</div>
</div>

<style>
	.str-modal {
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		background: white;
	}

	.size-xl {
		width: 600px;
		height: 650px;
	}

	.size-lg {
		width: 600px;
		height: 600px;
	}

	.size-md {
		width: 600px;
		height: 550px;
	}

	.size-sm {
		width: 600px;
		height: 440px;
	}
</style>
