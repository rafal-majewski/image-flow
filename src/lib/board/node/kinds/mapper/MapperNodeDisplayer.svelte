<script lang="ts">
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import NodeDisplayer from "../../NodeDisplayer.svelte";
	import {MapperNode} from "./MapperNode.svelte.ts";
	import type {Node} from "../../Node.svelte.ts";
	import MapperNodeStateDisplayer from "./state/MapperNodeStateDisplayer.svelte";
	import type {Mapper} from "./mapper/Mapper.ts";
	import type {SupportedBoardMode} from "../../../mode/SupportedBoardMode.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputNodeRequest,
		onSetOutputNodeRequest,
		boardMode,
	}: Readonly<{
		node: MapperNode;
		onDeleteRequest: (node: Node) => void;
		onMouseLeftButtonDown: (
			node: Node,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node) => void;
		onSetInputNodeRequest: (
			targetNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		onSetOutputNodeRequest: (
			targetNode: MapperNode,
			mouseClientPosition: Coordinates,
		) => void;
		boardMode: SupportedBoardMode | null;
	}> = $props();
	function handleDoStepRequest(): void {
		node.doSteps();
	}
	function handleUnsetMapperRequest(): void {
		node.unsetMapper();
	}
	function handleSetMapperRequest(mapper: Mapper): void {
		node.setMapper(mapper);
	}
	function handleSetInputNodeRequest(mouseClientPosition: Coordinates): void {
		onSetInputNodeRequest(node, mouseClientPosition);
	}
	function handleSetOutputNodeRequest(mouseClientPosition: Coordinates): void {
		onSetOutputNodeRequest(node, mouseClientPosition);
	}
</script>

{#snippet stateDisplayer()}
	<MapperNodeStateDisplayer
		state={node.state}
		onDoStepRequest={handleDoStepRequest}
		onUnsetMapperRequest={handleUnsetMapperRequest}
		onSetMapperRequest={handleSetMapperRequest}
		{boardMode}
		onSetInputNodeRequest={handleSetInputNodeRequest}
		onSetOutputNodeRequest={handleSetOutputNodeRequest}
	/>
{/snippet}

<NodeDisplayer
	name="Mapper"
	{node}
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{stateDisplayer}
/>
