<script lang="ts">
	import type {Coordinates} from "../../../coordinates/Coordinates.ts";
	import NodeDisplayer from "../../NodeDisplayer.svelte";
	import type {FromUrlLoaderNode} from "./FromUrlLoaderNode.svelte.ts";
	import type {Node} from "../../Node.svelte.ts";
	import type {SupportedBoardMode} from "../../../mode/SupportedBoardMode.ts";
	import FromUrlLoaderNodeStateDisplayer from "./state/FromUrlLoaderNodeStateDisplayer.svelte";
	const {
		node,
		onDeleteRequest,
		onMouseLeftButtonDown,
		onMouseLeftButtonUp,
		boardMode,
		onSetOutputNodeRequest,
	}: Readonly<{
		node: FromUrlLoaderNode;
		onDeleteRequest: (node: Node) => void;
		onMouseLeftButtonDown: (
			node: Node,
			mouseClientPosition: Coordinates,
		) => void;
		onMouseLeftButtonUp: (node: Node) => void;
		boardMode: SupportedBoardMode | null;
		onSetOutputNodeRequest: (
			targetNode: FromUrlLoaderNode,
			mouseClientPosition: Coordinates,
		) => void;
	}> = $props();
	function handleSetUrlRequest(url: string): void {
		node.setUrl(url);
	}
	function handleSetOutputNodeRequest(mouseClientPosition: Coordinates): void {
		onSetOutputNodeRequest(node, mouseClientPosition);
	}
</script>

{#snippet stateDisplayer()}
	<FromUrlLoaderNodeStateDisplayer
		state={node.state}
		onSetUrlRequest={handleSetUrlRequest}
		{boardMode}
		onSetOutputNodeRequest={handleSetOutputNodeRequest}
	/>
{/snippet}

<NodeDisplayer
	name="From URL loader"
	{node}
	{onDeleteRequest}
	{onMouseLeftButtonDown}
	{onMouseLeftButtonUp}
	{stateDisplayer}
/>
