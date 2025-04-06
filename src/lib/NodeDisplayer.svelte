<script lang="ts">
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
		onAddOutputEdgeRequest: (
			sourceNode: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onAddInputEdgeRequest: (
			sourceNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonDown: (
			node: SupportedNode,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: SupportedNode) => void;
		onDeleteRequest: (node: SupportedNode) => void;
	}> = $props();
</script>

{#if node instanceof MapperNode}
	<MapperNodeDisplayer {node} {...restProps} />
{:else if node instanceof FromUrlLoaderNode}
	<FromUrlLoaderNodeDisplayer {node} {...restProps} />
{/if}
