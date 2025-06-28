<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import type {Node} from "../../../Node.svelte.ts";
	import Canvas from "../../../operating/state/displayer/canvas/Canvas.svelte";
	import {NodeState} from "../../../state/NodeState.ts";
	import type {FromFileLoaderNode} from "../FromFileLoaderNode.ts";
	import {LoadingDonedFromFileLoaderNodeState} from "../state/implementations/loading-doned/LoadingDonedFromFileLoaderNodeState.ts";
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
		readonly node: FromFileLoaderNode;
		readonly boardMode: null | SupportedBoardMode;
		readonly onMouseLeftButtonDown: (
			node: Node<NodeState>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		readonly onMouseLeftButtonUp: (node: Node<NodeState>) => void;
		readonly onSetInputRequest: (
			index: number,
			nodeInRequest: Node<NodeState>,
			inViewportPosition: Coordinates,
		) => void;
		readonly onSetOutputRequest: (
			nodeInRequest: Node<NodeState>,
			inViewportPosition: Coordinates,
		) => void;
	} = $props();
	function handleFileInputChange(
		event: Event & {readonly currentTarget: HTMLInputElement},
	): void {
		const file = (event.currentTarget.files as FileList)[0] as File;
		node.setFile(file);
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
	<input type="file" accept="image/*" onchange={handleFileInputChange} />
	{#if node.state instanceof LoadingDonedFromFileLoaderNodeState}
		<Canvas image={node.state.image} />
	{/if}
</NodeDisplayer>
