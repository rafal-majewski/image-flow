<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	import {CombinerOperatingNode} from "../node/implementations/combiner/CombinerOperatingNode.ts";
	import {FromFileLoaderNode} from "../node/implementations/from-file-loader/FromFileLoaderNode.ts";
	import {FromUrlLoaderNode} from "../node/implementations/from-url-loader/FromUrlLoaderNode.ts";
	import {GeneratorOperatingNode} from "../node/implementations/generator/GeneratorOperatingNode.ts";
	import {MapperOperatingNode} from "../node/implementations/mapper/MapperOperatingNode.ts";
	import {StaticNode} from "../node/implementations/static-node/StaticNode.ts";
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
	function handleAddStaticNodeButtonClick(): void {
		onAddNodeRequest(new StaticNode(cameraPosition));
	}
</script>

<section>
	Add a
	<menu>
		<li>
			<button onclick={handleAddStaticNodeButtonClick}>static</button>
		</li>
		<li>
			<button onclick={handleAddFromFileLoaderNodeButtonClick}
				>from file loader</button
			>
		</li>
		<li>
			<button onclick={handleAddFromUrlLoaderNodeButtonClick}
				>from URL loader</button
			>
		</li>
		<li>
			<button onclick={handleAddGeneratorOperatingNodeButtonClick}
				>generator operatable</button
			>
		</li>
		<li>
			<button onclick={handleAddMapperOperatingNodeButtonClick}
				>mapper operatable</button
			>
		</li>
		<li>
			<button onclick={handleAddCombinerOperatingNodeButtonClick}
				>combiner operatable</button
			>
		</li>
	</menu>
	node
</section>

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
