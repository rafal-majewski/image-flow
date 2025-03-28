<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	const {
		position,
		onAddFromUrlLoaderNodeClick,
	}: Readonly<{
		position: Coordinates;
		onAddFromUrlLoaderNodeClick: () => void;
	}> = $props();
	let htmlElement: HTMLDialogElement;
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	bind:this={htmlElement}
	open
>
	<button onclick={onAddFromUrlLoaderNodeClick}>Add from URL loader</button>
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
