<script lang="ts">
	import type {Coordinates} from "../../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../../mode/supported/SupportedBoardMode.ts";
	import type {Node} from "../../../../Node.svelte.ts";
	import WithStateNodeDisplayer from "../../../displayer/WithStateNodeDisplayer.svelte";
	import Canvas from "../../operatable/state/displayer/canvas/Canvas.svelte";
	import type {FromUrlLoaderNode} from "../FromUrlLoaderNode.ts";
	import {LoadingDonedFromUrlLoaderNodeState} from "../state/implementations/loading-doned/LoadingDonedFromUrlLoaderNodeState.ts";
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
		node: FromUrlLoaderNode;
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
	function handleUrlInputChange(
		event: Event & Readonly<{currentTarget: HTMLInputElement}>,
	): void {
		node.setUrl(event.currentTarget.value);
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
	<input type="url" placeholder="Image URL" onchange={handleUrlInputChange} />
	{#if node.state instanceof LoadingDonedFromUrlLoaderNodeState}
		<Canvas image={(node.state as LoadingDonedFromUrlLoaderNodeState).image} />
	{/if}
</WithStateNodeDisplayer>
