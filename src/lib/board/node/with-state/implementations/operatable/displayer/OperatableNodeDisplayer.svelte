<script
	lang="ts"
	generics="
		InputEdgeCount extends number,
	"
>
	import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../../../../Node.svelte.ts";
	import WithStateNodeDisplayer from "../../../displayer/WithStateNodeDisplayer.svelte";
	import type {OperatableNode} from "../OperatableNode.svelte.ts";
	import type {Operator} from "../operator/Operator.ts";
	import OperatableNodeStateDisplayer from "../state/displayer/OperatableNodeStateDisplayer.svelte";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		boardMode,
	}: Readonly<{
		onDeleteRequest: (node: Node<InputEdgeCount>) => void;
		node: OperatableNode<InputEdgeCount>;
		boardMode: null | SupportedBoardMode;
		onMouseLeftButtonDown: (
			node: Node<InputEdgeCount>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node<InputEdgeCount>) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: Node<InputEdgeCount>,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: Node<InputEdgeCount>,
			inViewportPosition: Coordinates,
		) => void;
	}> = $props();
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

<WithStateNodeDisplayer
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{onSetInputRequest}
	{onSetOutputRequest}
	{boardMode}
	{node}
>
	<OperatableNodeStateDisplayer
		state={node.state}
		operators={node.operators}
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
</WithStateNodeDisplayer>
