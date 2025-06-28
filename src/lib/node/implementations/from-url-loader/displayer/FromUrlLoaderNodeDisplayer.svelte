<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import type {Node} from "../../../Node.svelte.ts";
	import Canvas from "../../../operating/state/displayer/canvas/Canvas.svelte";
	import {NodeState} from "../../../state/NodeState.ts";
	import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.ts";
	import {LoadingDonedFromUrlLoaderNodeState} from "../state/implementations/loading-doned/LoadingDonedFromUrlLoaderNodeState.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetOutputRequest,
		boardMode,
	}: {
		readonly onDeleteRequest: (node: Node<NodeState>) => void;
		readonly node: FromUrlLoaderNode;
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
	function handleUrlInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		node.setUrl(event.currentTarget.value);
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
	<input type="url" placeholder="Image URL" onchange={handleUrlInputChange} />
	{#if node.state instanceof LoadingDonedFromUrlLoaderNodeState}
		<Canvas image={(node.state as LoadingDonedFromUrlLoaderNodeState).image} />
	{/if}
</NodeDisplayer>
