<script lang="ts">
	import type {Coordinates} from "../../../../coordinates/Coordinates.ts";
	import NodeDisplayer from "../../../displayer/NodeDisplayer.svelte";
	import type {FromFileLoaderNode} from "../FromFileLoaderNode.svelte.ts";
	import type {Node} from "../../../Node.svelte.ts";
	import type {SupportedBoardMode} from "../../../../mode/supported/SupportedBoardMode.ts";
	import FromFileLoaderNodeStateDisplayer from "../state/displayer/FromFileLoaderNodeStateDisplayer.svelte";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		boardMode,
		onSetOutputNodeRequest,
	}: Readonly<{
		node: FromFileLoaderNode;
		onDeleteRequest: (node: Node) => void;
		onMouseLeftButtonDown: (
			node: Node,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node) => void;
		boardMode: SupportedBoardMode | null;
		onSetOutputNodeRequest: (
			targetNode: FromFileLoaderNode,
			mouseClientPosition: Coordinates,
		) => void;
	}> = $props();
	function handleSetFileRequest(file: File): void {
		node.setFile(file);
	}
	function handleSetOutputNodeRequest(mouseClientPosition: Coordinates): void {
		onSetOutputNodeRequest(node, mouseClientPosition);
	}
</script>

{#snippet stateDisplayer()}
	<FromFileLoaderNodeStateDisplayer
		state={node.state}
		onSetFileRequest={handleSetFileRequest}
		{boardMode}
		onSetOutputNodeRequest={handleSetOutputNodeRequest}
	/>
{/snippet}
<NodeDisplayer
	name="From file loader"
	{node}
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{stateDisplayer}
/>
