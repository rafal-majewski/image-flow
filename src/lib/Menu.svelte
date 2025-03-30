<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	const {
		position,
		onAddFromUrlLoaderNodeClick,
		onAddMapperNodeClick,
	}: Readonly<{
		position: Coordinates;
		onAddFromUrlLoaderNodeClick: () => void;
		onAddMapperNodeClick: () => void;
	}> = $props();
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	open
>
	<button onclick={onAddFromUrlLoaderNodeClick}>Add from URL loader</button>
	<button onclick={onAddMapperNodeClick}>Add mapper</button>
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
