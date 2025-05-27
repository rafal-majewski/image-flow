<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import {MapperNode} from "../MapperNode.svelte.ts";
	import type {Node} from "../../../Node.svelte.ts";
	import MapperNodeStateDisplayer from "../state/displayer/MapperNodeStateDisplayer.svelte";
	import type {Mapper} from "../mapper/Mapper.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
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
	function handleDoManualStepsRequest(): void {
		node.doManualSteps();
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
	function handleSetStepCountRequest(stepCount: number): void {
		node.setStepCount(stepCount);
	}
	function handleSetIntervalIntervalRequest(
		intervalIntervalSeconds: number,
	): void {
		node.setIntervalInterval(intervalIntervalSeconds);
	}
	function handleResetRequest(): void {
		node.resetOutputImage();
	}
</script>

{#snippet stateDisplayer()}
	<MapperNodeStateDisplayer
		id={node.id}
		state={node.state}
		onDoManualStepsRequest={handleDoManualStepsRequest}
		onUnsetMapperRequest={handleUnsetMapperRequest}
		onSetMapperRequest={handleSetMapperRequest}
		{boardMode}
		onSetNodeRequest={handleSetNodeRequest}
		onSetOutputNodeRequest={handleSetOutputNodeRequest}
		onMakeManualRequest={handleMakeManualRequest}
		onMakeAnimatedRequest={handleMakeAnimatedRequest}
		onMakeInstantRequest={handleMakeInstantRequest}
		onSetStepCountRequest={handleSetStepCountRequest}
		onSetIntervalIntervalRequest={handleSetIntervalIntervalRequest}
		onResetOutputImageRequest={handleResetRequest}
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
