<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	const {
		position,
		onAddMapperOperatingNodeRequest,
		onAddGeneratorOperatingNodeRequest,
		onAddFromFileLoaderNodeRequest,
		onAddFromUrlLoaderNodeRequest,
		onAddCombinerOperatingNodeRequest,
	}: {
		readonly position: Coordinates;
		readonly onAddMapperOperatingNodeRequest: (position: Coordinates) => void;
		readonly onAddGeneratorOperatingNodeRequest: (
			position: Coordinates,
		) => void;
		readonly onAddFromFileLoaderNodeRequest: (position: Coordinates) => void;
		readonly onAddFromUrlLoaderNodeRequest: (position: Coordinates) => void;
		readonly onAddCombinerOperatingNodeRequest: (position: Coordinates) => void;
	} = $props();
	function handleAddGeneratorOperatingNodeButtonClick(): void {
		onAddGeneratorOperatingNodeRequest(position);
	}
	function handleAddMapperOperatingNodeButtonClick(): void {
		onAddMapperOperatingNodeRequest(position);
	}
	function handleAddFromFileLoaderNodeButtonClick(): void {
		onAddFromFileLoaderNodeRequest(position);
	}
	function handleAddFromUrlLoaderNodeButtonClick(): void {
		onAddFromUrlLoaderNodeRequest(position);
	}
	function handleAddCombinerOperatingNodeButtonClick(): void {
		onAddCombinerOperatingNodeRequest(position);
	}
</script>

<dialog
	style:top="calc({position.y}px + 50%)"
	style:left="calc({position.x}px + 50%)"
	open
>
	<menu>
		<li>
			<button onclick={handleAddFromFileLoaderNodeButtonClick}
				>Add a from file loader</button
			>
		</li>
		<li>
			<button onclick={handleAddFromUrlLoaderNodeButtonClick}
				>Add a from URL loader</button
			>
		</li>
		<li>
			<button onclick={handleAddGeneratorOperatingNodeButtonClick}
				>Add a generator operatable</button
			>
		</li>
		<li>
			<button onclick={handleAddMapperOperatingNodeButtonClick}
				>Add a mapper operatable</button
			>
		</li>
		<li>
			<button onclick={handleAddCombinerOperatingNodeButtonClick}
				>Add a combiner operatable</button
			>
		</li>
	</menu>
</dialog>

<style>
	dialog {
		transform: translate(-50%, -50%);
		margin: 0;
		z-index: 1;
		width: min-content;
	}
</style>
