<script lang="ts">
	import type {Coordinates} from "../coordinates/Coordinates.ts";
	import {FromUrlLoaderNode} from "./kinds/from-url-loader/FromUrlLoaderNode.svelte.ts";
	import FromUrlLoaderNodeDisplayer from "./kinds/from-url-loader/FromUrlLoaderNodeDisplayer.svelte";
	import {MapperNode} from "./kinds/mapper/MapperNode.svelte.ts";
	import MapperNodeDisplayer from "./kinds/mapper/MapperNodeDisplayer.svelte";
	import type {SupportedNode} from "./SupportedNode.ts";
	import type {Node} from "./Node.svelte.ts";
	import type {SupportedBoardMode} from "../mode/SupportedBoardMode.ts";
	import type {SupportedInputNode} from "./SupportedInputNode.ts";
	import type {SupportedOutputNode} from "./SupportedOutputNode.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		boardMode,
		onSetInputNodeRequest,
		onSetOutputNodeRequest,
	}: Readonly<{
		node: SupportedNode;
		onDeleteRequest: (node: Node) => void;
		onMouseLeftButtonDown: (
			node: Node,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node) => void;
		boardMode: SupportedBoardMode | null;
		onSetInputNodeRequest: (
			targetNode: SupportedOutputNode,
			mouseClientPosition: Coordinates,
		) => void;
		onSetOutputNodeRequest: (
			targetNode: SupportedInputNode,
			mouseClientPosition: Coordinates,
		) => void;
	}> = $props();
</script>

{#if node instanceof MapperNode}
	<MapperNodeDisplayer
		{onSetInputNodeRequest}
		{node}
		{onDeleteRequest}
		{onMouseLeftButtonDown}
		{onMouseLeftButtonUp}
		{boardMode}
		{onSetOutputNodeRequest}
	/>
{:else if node instanceof FromUrlLoaderNode}
	<FromUrlLoaderNodeDisplayer
		{node}
		{onDeleteRequest}
		{onMouseLeftButtonDown}
		{onMouseLeftButtonUp}
		{boardMode}
		{onSetOutputNodeRequest}
	/>
{/if}
