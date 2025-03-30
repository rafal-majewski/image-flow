<script lang="ts">
	import NodeDisplayer from "./NodeDisplayer.svelte";
	import type {MapperNode} from "./MapperNode.svelte.ts";
	import type {Node} from "./Node.ts";
	const {
		node,
		onDelete,
	}: Readonly<{node: MapperNode; onDelete: (node: Node) => void}> = $props();
</script>

{#snippet content()}
	<section>mapper</section>
{/snippet}

<NodeDisplayer {content} {node} {onDelete} />
