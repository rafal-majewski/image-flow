<script lang="ts">
	import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../../../../Node.svelte.ts";
	import WithStateNodeDisplayer from "../../../displayer/WithStateNodeDisplayer.svelte";
	import Canvas from "../../operatable/state/displayer/canvas/Canvas.svelte";
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
		const file = (event.currentTarget.files as FileList)[0] as File;
		node.setFile(file);
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
	<input type="file" accept="image/*" onchange={handleFileInputChange} />
	{#if node.state instanceof LoadingDonedFromFileLoaderNodeState}
		<Canvas image={node.state.image} />
	{/if}
</WithStateNodeDisplayer>
