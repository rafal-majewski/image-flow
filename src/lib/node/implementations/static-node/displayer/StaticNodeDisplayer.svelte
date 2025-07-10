<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import type {Node} from "../../../Node.svelte.ts";
	import Canvas from "../../../operating/state/displayer/canvas/Canvas.svelte";
	import {NodeState} from "../../../state/NodeState.ts";
	import type {StaticNode} from "../StaticNode.ts";
	import {availableImageFilePaths} from "../available-images/availableImageFilePaths.ts";
	import {LoadingDonedStaticNodeState} from "../state/implementations/loading-doned/LoadingDonedStaticNodeState.ts";
	import {LoadingStartedStaticNodeState} from "../state/implementations/loading-started/LoadingStartedStaticNodeState.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetOutputRequest,
		boardMode,
	}: {
		readonly onDeleteRequest: (node: Node<NodeState>) => void;
		readonly node: StaticNode;
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
	} = $props();
	function handleImageSelect(
		event: Event & {readonly currentTarget: HTMLSelectElement},
	): void {
		node.setImageFilePath(event.currentTarget.value);
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
	<select onchange={handleImageSelect}>
		<option value="">Select an image...</option>
		{#each availableImageFilePaths as imageFilePath}
			<option
				value={imageFilePath}
				selected={(node.state instanceof LoadingStartedStaticNodeState
					|| node.state instanceof LoadingDonedStaticNodeState)
					&& node.state.imageFilePath === imageFilePath}
			>
				{imageFilePath}
			</option>
		{/each}
	</select>
	{#if node.state instanceof LoadingDonedStaticNodeState}
		<Canvas image={node.state.image} />
	{/if}
</NodeDisplayer>
