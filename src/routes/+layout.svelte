<script lang="ts">
	import '../app.css';
</script>

<div class="layout text-neutral">
	<slot />
</div>

<style>
	.layout {
		user-select: none;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
</style>
