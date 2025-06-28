<script lang="ts">
	import {Coordinates} from "../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../displayer/NodeDisplayer.svelte";
	import type {Node} from "../../Node.svelte.ts";
	import type {Operator} from "../../operator/Operator.ts";
	import type {NodeState} from "../../state/NodeState.ts";
	import type {OperatingNode} from "../OperatingNode.svelte.ts";
	import OperatingNodeStateDisplayer from "../state/displayer/OperatingNodeStateDisplayer.svelte";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		boardMode,
	}: {
		readonly onDeleteRequest: (node: Node<NodeState>) => void;
		readonly node: OperatingNode<number>;
		readonly boardMode: null | SupportedBoardMode;
		readonly onMouseLeftButtonDown: (
			node: Node<NodeState>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		readonly onMouseLeftButtonUp: (node: Node<NodeState>) => void;
		readonly onSetOutputRequest: (
			nodeInRequest: Node<NodeState>,
			inViewportPosition: Coordinates,
		) => void;
		readonly onSetInputRequest: (
			nodeInRequest: OperatingNode<number>,
			nodeInRequestInputIndex: number,
			inViewportPosition: Coordinates,
		) => void;
	} = $props();
	function handleMakeManualRequest(): void {
		node.makeManual();
	}
	function handleMakeAnimatedRequest(): void {
		node.makeAnimated();
	}
	function handleMakeInstantRequest(): void {
		node.makeInstant();
	}
	function handleSetOperatorRequest(operator: Operator<number>): void {
		node.setOperator(operator);
	}
	function handleResetOutputImageRequest(): void {
		node.resetOutputImage();
	}
	function handleDoManualStepsRequest(): void {
		node.doManualSteps();
	}
	function handleUnsetOperatorRequest(): void {
		node.unsetOperator();
	}
	function handleSetStepCountRequest(stepCount: number): void {
		node.setStepCount(stepCount);
	}
	function handleSetIntervalIntervalRequest(
		intervalIntervalSeconds: number,
	): void {
		node.setIntervalInterval(intervalIntervalSeconds);
	}
	function handleSetInputButtonClick(
		index: number,
		mouseCursorInViewportPosition: Coordinates,
	): void {
		onSetInputRequest(node, index, mouseCursorInViewportPosition);
	}
</script>

<NodeDisplayer
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{onSetOutputRequest}
	{boardMode}
	{node}
>
	<ol>
		{#each node.inputEdges as edge, index (index)}
			<li>
				<button
					disabled={boardMode !== null && boardMode.name === "settingEdgeInput"}
					onclick={(event) => {
						handleSetInputButtonClick(
							index,
							new Coordinates(event.clientX, event.clientY),
						);
					}}>🔌</button
				>
				{#if edge !== null}
					{#if edge.image === null}
						⌛
					{:else}
						🖼️
					{/if}
				{/if}
			</li>
		{/each}
	</ol>
	<OperatingNodeStateDisplayer
		state={node.state}
		availableOperators={node.availableOperators}
		nodeId={node.id}
		onMakeManualRequest={handleMakeManualRequest}
		onMakeAnimatedRequest={handleMakeAnimatedRequest}
		onMakeInstantRequest={handleMakeInstantRequest}
		onSetOperatorRequest={handleSetOperatorRequest}
		onResetOutputImageRequest={handleResetOutputImageRequest}
		onDoManualStepsRequest={handleDoManualStepsRequest}
		onUnsetOperatorRequest={handleUnsetOperatorRequest}
		onSetStepCountRequest={handleSetStepCountRequest}
		onSetIntervalIntervalRequest={handleSetIntervalIntervalRequest}
	/>
</NodeDisplayer>
