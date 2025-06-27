<script
	lang="ts"
	generics="
		InputEdgeCount extends number,
	"
>
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../displayer/NodeDisplayer.svelte";
	import type {Operator} from "../../operator/Operator.ts";
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
		readonly onDeleteRequest: (node: Node) => void;
		readonly node: OperatingNode<InputEdgeCount>;
		readonly boardMode: null | SupportedBoardMode;
		readonly onMouseLeftButtonDown: (
			node: Node,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		readonly onMouseLeftButtonUp: (node: Node) => void;
		readonly onSetInputRequest: (
			index: number,
			nodeInRequest: Node,
			inViewportPosition: Coordinates,
		) => void;
		readonly onSetOutputRequest: (
			nodeInRequest: Node,
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
	function handleSetOperatorRequest(operator: Operator<InputEdgeCount>): void {
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
</script>

<NodeDisplayer
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{onSetInputRequest}
	{onSetOutputRequest}
	{boardMode}
	{node}
>
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
