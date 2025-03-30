<script lang="ts">
	import NodeDisplayer from "./NodeDisplayer.svelte";
	import type {MapperNode} from "./MapperNode.svelte.ts";
	import type {Node} from "./Node.svelte.ts";
	const {
		node,
		onDeleted,
		onOutputAdded,
		onDraggingStarted,
	}: Readonly<{
		// TODO: REFACTOR, MOVE to board
		node: MapperNode;
		onDeleted: (node: Node) => void;
		onOutputAdded: (sourceNode: Node) => void;
		onDraggingStarted: (node: Node) => void;
	}> = $props();
</script>

{#snippet content()}
	<section>mapper</section>
{/snippet}

<NodeDisplayer
	{content}
	{node}
	{onDeleted}
	{onOutputAdded}
	{onDraggingStarted}
/>
