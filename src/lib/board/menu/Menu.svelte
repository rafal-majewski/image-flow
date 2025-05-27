<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	const {
		position,
		onAddMapperNodeRequest,
		onAddGeneratorNodeRequest,
		onAddCombinerNodeRequest,
	}: Readonly<{
		position: Coordinates;
		onAddMapperNodeRequest: () => void;
		onAddGeneratorNodeRequest: () => void;
		onAddCombinerNodeRequest: () => void;
	}> = $props();
	function handleAddGeneratorNodeButtonClick(): void {
		onAddGeneratorNodeRequest();
	}
	function handleAddMapperNodeButtonClick(): void {
		onAddMapperNodeRequest();
	}
	function handleAddCombinerNodeButtonClick(): void {
		onAddCombinerNodeRequest();
	}
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	open
>
	<button onclick={handleAddGeneratorNodeButtonClick}>Add generator</button>
	<button onclick={handleAddMapperNodeButtonClick}>Add mapper</button>
	<button onclick={handleAddCombinerNodeButtonClick}>Add combiner</button>
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
