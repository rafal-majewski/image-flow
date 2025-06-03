<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	const {
		position,
		onAddMapperOperatableNodeRequest,
		onAddGeneratorOperatableNodeRequest,
		onAddFromFileLoaderNodeRequest,
	}: Readonly<{
		position: Coordinates;
		onAddMapperOperatableNodeRequest: () => void;
		onAddGeneratorOperatableNodeRequest: () => void;
		onAddFromFileLoaderNodeRequest: () => void;
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
			</ul>
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
