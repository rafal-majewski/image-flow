<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import type {Node} from "../../../Node.svelte.ts";
	import Canvas from "../../operatable/state/displayer/canvas/Canvas.svelte";
	import type {FromFileLoaderNode} from "../FromFileLoaderNode.ts";
	import {WithImageFromFileLoaderNodeState} from "../WithImageFromFileLoaderNodeState.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		boardMode,
	}: Readonly<{
		onDeleteRequest: (node: Node<number>) => void;
		node: FromFileLoaderNode;
		boardMode: null | SupportedBoardMode;
		onMouseLeftButtonDown: (
			node: Node<number>,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node<number>) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: Node<number>,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: Node<number>,
			inViewportPosition: Coordinates,
		) => void;
	}> = $props();
	function handleFileInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		// @ts-expect-error: TODO
		const file = event.currentTarget.files[0] as File;
		node.setFile(file);
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
	<input type="file" accept="image/*" onchange={handleFileInputChange} />
	{#if node.state instanceof WithImageFromFileLoaderNodeState}
		<Canvas image={node.state.image} />
	{/if}
</NodeDisplayer>
