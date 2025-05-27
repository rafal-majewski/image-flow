<script lang="ts">
	import LineDisplayer from "../line-displayer/LineDisplayer.svelte";
	import type {Node} from "../node/Node.svelte.ts";
	import type {OutputNode} from "../node/OutputNode.ts";
	const {
		inputNode,
		outputNode,
		onDeleteRequest,
	}: Readonly<{
		inputNode: Node;
		outputNode: OutputNode;
		onDeleteRequest: (inputNode: Node, outputNode: OutputNode) => void;
	}> = $props();
	function handleDeleteButtonClick() {
		onDeleteRequest(inputNode, outputNode);
	}
</script>

<div>
	<LineDisplayer
		sourcePosition={inputNode.position}
		targetPosition={outputNode.position}
	/>
	<button
		onclick={handleDeleteButtonClick}
		style:top={`${(inputNode.position.y + outputNode.position.y) / 2}px`}
		style:left={`${(inputNode.position.x + outputNode.position.x) / 2}px`}
		>🗑️</button
	>
</div>

<style lang="scss">
	button {
		position: absolute;
		transform-origin: center left;
		transform: translate(-50%, -50%);
	}
</style>
