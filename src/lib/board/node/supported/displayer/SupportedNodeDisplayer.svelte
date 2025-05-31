<script lang="ts">
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../mode/supported/SupportedBoardMode.ts";
	import MapperNodeDisplayer from "../../implementations/mapper/displayer/MapperNodeDisplayer.svelte";
	import {MapperNode} from "../../implementations/mapper/MapperNode.svelte.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		boardMode,
	}: Readonly<{
		onDeleteRequest: (node: MapperNode) => void;
		node: MapperNode;
		boardMode: SupportedBoardMode | null;
		onMouseLeftButtonDown: (
			node: MapperNode,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: MapperNode) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: MapperNode,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: MapperNode,
			inViewportPosition: Coordinates,
		) => void;
	}> = $props();
</script>

{#if node instanceof MapperNode}
	<MapperNodeDisplayer
		{onSetInputRequest}
		{node}
		{onDeleteRequest}
		{onMouseLeftButtonDown}
		{onMouseLeftButtonUp}
		{onSetOutputRequest}
		{boardMode}
	/>
{/if}
