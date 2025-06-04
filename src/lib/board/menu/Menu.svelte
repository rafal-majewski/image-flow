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
		onAddMapperOperatableNodeRequest: () => void;
		onAddGeneratorOperatableNodeRequest: () => void;
		onAddFromFileLoaderNodeRequest: () => void;
		onAddFromUrlLoaderNodeRequest: () => void;
		onAddCombinerOperatableNodeRequest: () => void;
	}> = $props();
	function handleAddGeneratorOperatableNodeButtonClick(): void {
		onAddGeneratorOperatableNodeRequest();
	}
	function handleAddMapperOperatableNodeButtonClick(): void {
		onAddMapperOperatableNodeRequest();
	}
	function handleAddFromFileLoaderNodeButtonClick(): void {
		onAddFromFileLoaderNodeRequest();
	}
	function handleAddFromUrlLoaderNodeButtonClick(): void {
		onAddFromUrlLoaderNodeRequest();
	}
	function handleAddCombinerOperatableNodeButtonClick(): void {
		onAddCombinerOperatableNodeRequest();
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
