<script lang="ts">
	import type {Coordinates} from "./Coordinates.ts";
	import {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import {MapperNode} from "./MapperNode.svelte.ts";
	import type {Node} from "./Node.svelte.ts";
	const {
		position,
		onNodeAdded,
	}: Readonly<{position: Coordinates; onNodeAdded: (node: Node) => void}> =
		$props();
	function handleAddFromUrlLoaderNodeClick(): void {
		const node = new FromUrlLoaderNode(position);
		onNodeAdded(node);
	}
	function handleAddMapperNodeClick(): void {
		const node = new MapperNode(position);
		onNodeAdded(node);
	}
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	open
>
	<button onclick={handleAddFromUrlLoaderNodeClick}>Add from URL loader</button>
	<button onclick={handleAddMapperNodeClick}>Add mapper</button>
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
