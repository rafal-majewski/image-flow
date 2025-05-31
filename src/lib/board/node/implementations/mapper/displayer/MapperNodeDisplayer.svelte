<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import type {MapperNode} from "../MapperNode.svelte.ts";
	import {supportedMapperOperators} from "../supportedMapperOperators.ts";
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

<NodeDisplayer
	{node}
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{onSetInputRequest}
	{onSetOutputRequest}
	operators={supportedMapperOperators}
	{boardMode}
/>
