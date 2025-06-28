<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	import {CombinerOperatingNode} from "../node/implementations/combiner/CombinerOperatingNode.ts";
	import {FromFileLoaderNode} from "../node/implementations/from-file-loader/FromFileLoaderNode.ts";
	import {FromUrlLoaderNode} from "../node/implementations/from-url-loader/FromUrlLoaderNode.ts";
	import {GeneratorOperatingNode} from "../node/implementations/generator/GeneratorOperatingNode.ts";
	import {MapperOperatingNode} from "../node/implementations/mapper/MapperOperatingNode.ts";
	import type {Node} from "../node/Node.svelte.ts";
	import type {NodeState} from "../node/state/NodeState.ts";
	const {
		onAddNodeRequest,
		cameraPosition,
	}: {
		cameraPosition: Coordinates;
		readonly onAddNodeRequest: (nodeToAdd: Node<NodeState>) => void;
	} = $props();
	function handleAddGeneratorOperatingNodeButtonClick(): void {
		onAddNodeRequest(new GeneratorOperatingNode(cameraPosition));
	}
	function handleAddMapperOperatingNodeButtonClick(): void {
		onAddNodeRequest(new MapperOperatingNode(cameraPosition));
	}
	function handleAddFromFileLoaderNodeButtonClick(): void {
		onAddNodeRequest(new FromFileLoaderNode(cameraPosition));
	}
	function handleAddFromUrlLoaderNodeButtonClick(): void {
		onAddNodeRequest(new FromUrlLoaderNode(cameraPosition));
	}
	function handleAddCombinerOperatingNodeButtonClick(): void {
		onAddNodeRequest(new CombinerOperatingNode(cameraPosition));
	}
</script>

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

<style lang="scss">
	menu {
		display: flex;
		justify-content: center;
		list-style-type: disc;
		margin-block-start: 0;
		margin-block-end: 0;
		padding-inline-start: 0;
		list-style-type: none;
	}
</style>
