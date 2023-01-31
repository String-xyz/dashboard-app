<script lang="ts">
	export let size = 'size-lg';

</script>

<div 
	class="str-modal text-neutral border border-neutral"
	class:size-lg="{size === 'size-lg'}"
	class:size-md="{size === 'size-md'}"
>
	<div class="content w-full h-full">
		<slot />
	</div>
</div>

<style>
	.str-modal {
		border: 1px solid #DBDBDB;
		border-radius: 8px;
		background: white;
	}

	.size-lg {
		width: 600px;
		height: 600px;
	}

	.size-md {
		width: 600px;
		height: 550px;
	}

</style>
