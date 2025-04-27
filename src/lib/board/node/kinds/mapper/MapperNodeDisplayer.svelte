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
	function handleDoManualStepRequest(): void {
		node.doManualStep();
	}
	function handleUnsetMapperRequest(): void {
		node.unsetMapper();
	}
	function handleSetMapperRequest(mapper: Mapper): void {
		node.setMapper(mapper);
	}
	function handleSetNodeRequest(mouseClientPosition: Coordinates): void {
		onSetInputNodeRequest(node, mouseClientPosition);
	}
	function handleSetOutputNodeRequest(mouseClientPosition: Coordinates): void {
		onSetOutputNodeRequest(node, mouseClientPosition);
	}
	function handleMakeManualRequest(): void {
		node.makeManual();
	}
	function handleMakeAnimatedRequest(): void {
		node.makeAnimated();
	}
	function handleMakeInstantRequest(): void {
		node.makeInstant();
	}
</script>

{#snippet stateDisplayer()}
	<MapperNodeStateDisplayer
		id={node.id}
		state={node.state}
		onDoManualStepsRequest={handleDoManualStepRequest}
		onUnsetMapperRequest={handleUnsetMapperRequest}
		onSetMapperRequest={handleSetMapperRequest}
		{boardMode}
		onSetNodeRequest={handleSetNodeRequest}
		onSetOutputNodeRequest={handleSetOutputNodeRequest}
		onMakeManualRequest={handleMakeManualRequest}
		onMakeAnimatedRequest={handleMakeAnimatedRequest}
		onMakeInstantRequest={handleMakeInstantRequest}
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
