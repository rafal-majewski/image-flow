<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	const {
		position,
		onAddMapperNodeRequest,
		onAddGeneratorNodeRequest,
		onAddBicombinerNodeRequest,
	}: Readonly<{
		position: Coordinates;
		onAddMapperNodeRequest: () => void;
		onAddGeneratorNodeRequest: () => void;
		onAddBicombinerNodeRequest: () => void;
	}> = $props();
	function handleAddGeneratorNodeButtonClick(): void {
		onAddGeneratorNodeRequest();
	}
	function handleAddMapperNodeButtonClick(): void {
		onAddMapperNodeRequest();
	}
	function handleAddBicombinerNodeButtonClick(): void {
		onAddBicombinerNodeRequest();
	}
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	open
>
	<menu>
		<li>
			<button onclick={handleAddGeneratorNodeButtonClick}
				>Add a generator</button
			>
		</li>
		<li>
			<button onclick={handleAddMapperNodeButtonClick}>Add a mapper</button>
		</li>
		<li>
			<button onclick={handleAddBicombinerNodeButtonClick}
				>Add a bicombiner</button
			>
		</li>
	</menu>
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
