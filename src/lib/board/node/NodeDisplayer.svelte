<script lang="ts">
	import {MapperNode} from "./kinds/mapper/MapperNode.svelte.ts";
	import {FromUrlLoaderNode} from "./kinds/from-url-loader/FromUrlLoaderNode.svelte.ts";
	import MapperNodeDisplayer from "./kinds/mapper/MapperNodeDisplayer.svelte";
	import FromUrlLoaderNodeDisplayer from "./kinds/from-url-loader/FromUrlLoaderNodeDisplayer.svelte";
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	import type {SupportedNode} from "./SupportedNode.ts";
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
