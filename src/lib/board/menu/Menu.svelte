<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	const {
		position,
		onAddMapperOperatableNodeRequest,
		onAddGeneratorOperatableNodeRequest,
		onAddFromFileLoaderNodeRequest,
		onAddFromUrlLoaderNodeRequest,
		onAddCombinerOperatableNodeRequest,
	}: Readonly<{
		position: Coordinates;
		onAddMapperOperatableNodeRequest: (position: Coordinates) => void;
		onAddGeneratorOperatableNodeRequest: (position: Coordinates) => void;
		onAddFromFileLoaderNodeRequest: (position: Coordinates) => void;
		onAddFromUrlLoaderNodeRequest: (position: Coordinates) => void;
		onAddCombinerOperatableNodeRequest: (position: Coordinates) => void;
	}> = $props();
	function handleAddGeneratorOperatableNodeButtonClick(): void {
		onAddGeneratorOperatableNodeRequest(position);
	}
	function handleAddMapperOperatableNodeButtonClick(): void {
		onAddMapperOperatableNodeRequest(position);
	}
	function handleAddFromFileLoaderNodeButtonClick(): void {
		onAddFromFileLoaderNodeRequest(position);
	}
	function handleAddFromUrlLoaderNodeButtonClick(): void {
		onAddFromUrlLoaderNodeRequest(position);
	}
	function handleAddCombinerOperatableNodeButtonClick(): void {
		onAddCombinerOperatableNodeRequest(position);
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
			<ul>
				<li>
					<button onclick={handleAddGeneratorOperatableNodeButtonClick}
						>Add a generator operatable</button
					>
				</li>
				<li>
					<button onclick={handleAddMapperOperatableNodeButtonClick}
						>Add a mapper operatable</button
					>
				</li>
				<li>
					<button onclick={handleAddCombinerOperatableNodeButtonClick}
						>Add a combiner operatable</button
					>
				</li>
			</ul>
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
