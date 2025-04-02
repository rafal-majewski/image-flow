<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	const {
		position,
		onAddMapperNodeRequested,
		onAddFromUrlLoaderNodeRequested,
	}: Readonly<{
		position: Coordinates;
		onAddMapperNodeRequested: () => void;
		onAddFromUrlLoaderNodeRequested: () => void;
	}> = $props();
	function handleAddFromUrlLoaderNodeButtonClick(): void {
		onAddFromUrlLoaderNodeRequested();
	}
	function handleAddMapperNodeButtonClick(): void {
		onAddMapperNodeRequested();
	}
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	open
>
	<button onclick={handleAddFromUrlLoaderNodeButtonClick}
		>Add from URL loader</button
	>
	<button onclick={handleAddMapperNodeButtonClick}>Add mapper</button>
</dialog>

<style>
	dialog {
		transform: translate(-50%, -50%);
		margin: 0;
		z-index: 1;
		width: 200px;
		height: 200px;
	}
</style>
