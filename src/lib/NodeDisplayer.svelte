<script lang="ts">
	// write a component that takes a node and contitionally displays its real rendering component
	import {MapperNode} from "./MapperNode.svelte.ts";
	import type {SupportedNode} from "./SupportedNode.ts";
	import {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import MapperNodeDisplayer from "./MapperNodeDisplayer.svelte";
	import FromUrlLoaderNodeDisplayer from "./FromUrlLoaderNodeDisplayer.svelte";
	import type {Coordinates} from "./Coordinates.ts";
	const {
		node,
		...restProps
	}: Readonly<{
		node: SupportedNode;
		onAddOutputRequested: (
			sourceNode: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onAddInputRequested: (
			sourceNode: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDowned: (
			node: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUpped: (node: SupportedNode) => void;
		onDeleteRequested: (node: SupportedNode) => void;
	}> = $props();
</script>

{#if node instanceof MapperNode}
	<MapperNodeDisplayer {node} {...restProps} />
{:else if node instanceof FromUrlLoaderNode}
	<FromUrlLoaderNodeDisplayer {node} {...restProps} />
{/if}
