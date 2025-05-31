<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import {GeneratorNode} from "../GeneratorNode.svelte.ts";
	import {supportedGeneratorOperators} from "../supportedGeneratorOperators.ts";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		onSetInputRequest,
		onSetOutputRequest,
		boardMode,
	}: Readonly<{
		onDeleteRequest: (node: GeneratorNode) => void;
		node: GeneratorNode;
		boardMode: SupportedBoardMode | null;
		onMouseLeftButtonDown: (
			node: GeneratorNode,
			mouseCursorInViewportPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: GeneratorNode) => void;
		onSetInputRequest: (
			index: number,
			nodeInRequest: GeneratorNode,
			inViewportPosition: Coordinates,
		) => void;
		onSetOutputRequest: (
			nodeInRequest: GeneratorNode,
			inViewportPosition: Coordinates,
		) => void;
	}> = $props();
</script>

<NodeDisplayer
	{node}
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{onSetInputRequest}
	{onSetOutputRequest}
	operators={supportedGeneratorOperators}
	{boardMode}
/>
